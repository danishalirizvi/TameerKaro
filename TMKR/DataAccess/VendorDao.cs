using Dapper;
using System.Data;
using System.Linq;
using TKDR.Web.Helpers;
using TMKR.Models.DataModel;
using System;

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
                string query = "INSERT INTO Vendor (FRST_NME,LAST_NME,EMAIL,PHNE,BSNS_NME,USR_NME,PSWD) VALUES (@FRST_NME, @LAST_NME, @EMAIL, @PHNE, @BSNS_NME, @USR_NME, @PSWD) SELECT CAST(SCOPE_IDENTITY() as int)";

                var id = Conn.Query<int>(query, new { vendorVm.FRST_NME, vendorVm.LAST_NME, vendorVm.EMAIL, vendorVm.PHNE, vendorVm.BSNS_NME, vendorVm.USR_NME, vendorVm.PSWD }).Single();
                return id;
            }
        }


        public VendorModel ValidateUser(LoginCredentialsModel loginVm)
        {
            using (Conn)
            {
                string query = "SELECT Vendor.ID,FRST_NME,LAST_NME,EMAIL,PHNE,BSNS_NME,USR_NME,PSWD,Address,CITY FROM Vendor left join Address on USER_ID = Vendor.ID where USR_NME = @USR_NME and Type ='Vendor'";

                return Conn.QueryFirstOrDefault<VendorModel>(query, new { USR_NME = loginVm.Username });
            }
        }

        public void update(VendorModel vendorVm)
        {
            string query = null;

            if (vendorVm.PSWD != null)
            {
                query = @"UPDATE Vendor SET FRST_NME = @FRST_NME, LAST_NME = @LAST_NME, EMAIL = @EMAIL, PHNE = @PHNE, USR_NME = @USR_NME, PSWD = @PSWD WHERE ID = @ID";

                Conn.Execute(query, new { vendorVm.FRST_NME, vendorVm.LAST_NME, vendorVm.EMAIL, vendorVm.PHNE, vendorVm.USR_NME, vendorVm.PSWD, vendorVm.ID });
            }
            else
            {
                query = @"UPDATE Vendor SET FRST_NME = @FRST_NME, LAST_NME = @LAST_NME, EMAIL = @EMAIL, PHNE = @PHNE, USR_NME = @USR_NME WHERE ID = @ID";

                Conn.Execute(query, new { vendorVm.FRST_NME, vendorVm.LAST_NME, vendorVm.EMAIL, vendorVm.PHNE, vendorVm.USR_NME, vendorVm.ID });
            }
        }

        public VendorModel GetUser(int id)
        {
            using (Conn)
            {
                string query = @"SELECT Vendor.ID,FRST_NME,LAST_NME,EMAIL,PHNE,USR_NME,PSWD,Address,CITY FROM Vendor
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
                string query = "INSERT INTO Address (USER_ID, Address, CITY, Type) VALUES (@USER_ID, @Address, @CITY, @Type)";
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