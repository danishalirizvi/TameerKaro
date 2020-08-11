using Dapper;
using System.Data;
using System.Linq;
using TKDR.Web.Helpers;
using TMKR.Models.DataModel;
using System;
using System.Collections.Generic;

namespace TMKR.DataAccess
{
    public class VendorDao
    {
        private IDbConnection _con;

        public IDbConnection Conn
        {
            get
            {
                return _con = ConnectionFactory.CreateConnection();
            }
        }

        
        public bool ValidateUserName(string username)
        {

            using (Conn)
            {
                string query = "SELECT* FROM Vendor where USR_NME = @USR_NME";

                if (Conn.Query<VendorModel>(query,new { USR_NME = username }).ToList().Count != 0) {
                    return false;
                }
                return true;
            }
        }


        public int Insert(VendorModel vendorVm)
        {

            using (Conn)
            {
                string query = "INSERT INTO Vendor (FRST_NME,LAST_NME,EMAIL,PHNE,BSNS_NME,USR_NME,PSWD,IsActive) VALUES (@FRST_NME, @LAST_NME, @EMAIL, @PHNE, @BSNS_NME, @USR_NME, @PSWD,1) SELECT CAST(SCOPE_IDENTITY() as int)";

                var id = Conn.Query<int>(query, new { vendorVm.FRST_NME, vendorVm.LAST_NME, vendorVm.EMAIL, vendorVm.PHNE, vendorVm.BSNS_NME, vendorVm.USR_NME, vendorVm.PSWD }).Single();
                return id;
            }
        }


        public VendorModel ValidateUser(LoginCredentialsModel loginVm)
        {
            using (Conn)
            {
                string query = "SELECT Vendor.ID,FRST_NME,LAST_NME,EMAIL,PHNE,BSNS_NME,USR_NME,PSWD,Address,CITY FROM Vendor left join Address on USER_ID = Vendor.ID where USR_NME = @USR_NME and Type ='Vendor'and Vendor.IsActive = 1";

                return Conn.QueryFirstOrDefault<VendorModel>(query, new { USR_NME = loginVm.Username });
            }
        }

        public void update(VendorModel vendorVm)
        {
            string query = null;

            if (vendorVm.PSWD != null)
            {
                query = @"UPDATE Vendor SET FRST_NME = @FRST_NME, LAST_NME = @LAST_NME, EMAIL = @EMAIL, PHNE = @PHNE, BSNS_NME = @BSNS_NME, USR_NME = @USR_NME, PSWD = @PSWD WHERE ID = @ID";

                Conn.Execute(query, new { vendorVm.FRST_NME, vendorVm.LAST_NME, vendorVm.EMAIL, vendorVm.PHNE, vendorVm.BSNS_NME, vendorVm.USR_NME, vendorVm.PSWD, vendorVm.ID });
            }
            else
            {
                query = @"UPDATE Vendor SET FRST_NME = @FRST_NME, LAST_NME = @LAST_NME, EMAIL = @EMAIL, PHNE = @PHNE, BSNS_NME = @BSNS_NME, USR_NME = @USR_NME WHERE ID = @ID";

                Conn.Execute(query, new { vendorVm.FRST_NME, vendorVm.LAST_NME, vendorVm.EMAIL, vendorVm.PHNE, vendorVm.BSNS_NME, vendorVm.USR_NME, vendorVm.ID });
            }
        }

        public void blockVendor(int vendorId)
        {
            using (Conn)
            {
                string query = @"UPDATE Vendor SET IsACtive = 0 WHERE ID = @ID";

                Conn.Execute(query, new { ID = vendorId });
            }
        }

        internal void unblockVendor(int vendorId)
        {
            using (Conn)
            {
                string query = @"UPDATE Vendor SET IsACtive = 1 WHERE ID = @ID";

                Conn.Execute(query, new { ID = vendorId });
            }
        }

        public List<VendorModel> getVendors()
        {
            using (Conn)
            {
                string query = "select v.*,Address,City as CITY from Vendor v left join Address a on v.ID = a.USER_ID where Type = 'Vendor'";

                return Conn.Query<VendorModel>(query).ToList();
            }
        }

        public string getpicpath(int id, string type)
        {
            using (Conn)
            {
                string query = @"SELECT Path FROM Images WHERE FId = @FId AND Type = @Type";

                return Conn.QueryFirstOrDefault<string>(query, new { FId = id, Type = type });
            }
        }

        public void Pic(ProfilePicModel photo)
        {
            if (photo.Action == "Update")
            {
                string query = @"UPDATE Images SET Path = @Path WHERE FId = @FId AND Type = @Type";

                Conn.Execute(query, new { Path = photo.Path, FId = photo.Id, Type = "Vendor" });
            }
            else if(photo.Action == "Create")
            {
                string query = "INSERT INTO Images (Path, FId, Type, IsActive) VALUES (@Path, @FId, @Type, 1)";

                Conn.Execute(query, new { Path = photo.Path, FId = photo.Id, Type = photo.Type });
            }
        }

        public VendorModel GetUser(int id)
        {
            using (Conn)
            {
                string query = @"SELECT Vendor.ID,FRST_NME,LAST_NME,EMAIL,PHNE,BSNS_NME,USR_NME,PSWD,Address,CITY FROM Vendor
                                left join Address on USER_ID = Vendor.ID WHERE Vendor.ID = @ID";

                return Conn.QueryFirstOrDefault<VendorModel>(query, new { ID = id });
            }
        }

        public void updateAddress(VendorModel vendorVm)
        {
            using (Conn)
            {
                string query = @"UPDATE Address SET Address = @Address, CITY = @CITY WHERE ID = @ID";

                Conn.Execute(query, new { vendorVm.Address, vendorVm.CITY, vendorVm.ID });
            }
        }

        public VendorModel getPassword(int id)
        {
            using (Conn)
            {
                string query = @"SELECT * FROM Vendor WHERE ID = @ID";

                return Conn.QueryFirstOrDefault<VendorModel>(query, new { @ID = id });
            }
        }

        public void resetPass()
        {
            string query = @"UPDATE Vendor SET PSWD = @PSWD WHERE ID = @ID";

            Conn.Execute(query, new { PSWD = PasswordHasher.HashPassword("1"), ID = 1});

        }

        public void UpdateProfile(VendorModel vendorVm,int id) {
            string query = @"UPDATE Vendor
                            SET 
                            FRST_NME = @FRST_NME,
                            LAST_NME = @LAST_NME,
                            EMAIL = @EMAIL,
                            PHNE = @PHNE,
                            BSNS_NME = @BSNS_NME,
                            USR_NME = @USR_NME,
                            PSWD = @PSWD
                            WHERE ID = @ID";

            Conn.Execute(query, new { vendorVm.FRST_NME, vendorVm.LAST_NME, vendorVm.EMAIL, vendorVm.PHNE, vendorVm.BSNS_NME, vendorVm.USR_NME, vendorVm.PSWD, id});

        }


        public void InsertAddress(VendorModel vendorVm)
        {
            using (Conn)
            {
                string query = "INSERT INTO Address (USER_ID, Address, CITY, Type, IsActive) VALUES (@USER_ID, @Address, @CITY, @Type, 1)";
                Conn.Execute(query, new { USER_ID = vendorVm.ID, vendorVm.Address, vendorVm.CITY, Type = "Vendor" });
            }
        }

        public bool CheckUsername(string username)
        {
            using (Conn)
            {
                string query = @"SELECT count(DISTINCT 1) FROM Vendor WHERE USR_NME = @USR_NME";


                var exists = Conn.ExecuteScalar<bool>(query, new { @USR_NME = username });
                return exists;
            }
        }
    }
}