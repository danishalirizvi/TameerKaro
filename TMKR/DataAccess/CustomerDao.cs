using Dapper;
using System.Data;
using System.Linq;
using TMKR.Models.DataModel;
using System;

namespace TMKR.DataAccess
{
    public class CustomerDao
    {
        private IDbConnection _con;

        public IDbConnection Conn
        {
            get
            {
                return _con = ConnectionFactory.CreateConnection();
            }
        }

        //User Validation
        public CustomerModel ValidateUser(LoginCredentialsModel credentials)
        {
            using (Conn)
            {
                string query = @"SELECT Customer.ID,FRST_NME,LAST_NME,EMAIL,PHNE,USR_NME,PSWD,Address,CITY FROM Customer
                                left join Address on USER_ID = Customer.ID WHERE USR_NME = @Username";

                return Conn.QueryFirstOrDefault<CustomerModel>(query, new { credentials.Username });
            }
        }

        public CustomerModel GetUser(int id)
        {
            using (Conn)
            {
                string query = @"SELECT Customer.ID,FRST_NME,LAST_NME,EMAIL,PHNE,USR_NME,PSWD,Address,CITY FROM Customer
                                left join Address on USER_ID = Customer.ID WHERE Customer.ID = @ID";

                return Conn.QueryFirstOrDefault<CustomerModel>(query, new { ID = id });
            }
        }

        //User Insertion
        public int Insert(CustomerModel customerVm)
        {
            using (Conn)
            {
                string query = "INSERT INTO Customer(FRST_NME, LAST_NME, EMAIL, PHNE, USR_NME, PSWD) VALUES(@FRST_NME, @LAST_NME, @EMAIL, @PHNE, @USR_NME, @PSWD) SELECT CAST(SCOPE_IDENTITY() as int)";
                var id = Conn.Query<int>(query, new { customerVm.FRST_NME, customerVm.LAST_NME, customerVm.EMAIL, customerVm.PHNE, customerVm.USR_NME, customerVm.PSWD }).Single();
                return id;
            }
        }

        public void updateAddress(CustomerProfileModel customerVm)
        {
            using (Conn)
            {
                string query = @"UPDATE Address SET Address = @Address, CITY = @CITY WHERE ID = @ID";

                Conn.Execute(query, new { customerVm.Address, customerVm.CITY, customerVm.ID });
            }
        }

        public void update(CustomerProfileModel customerVm)
        {
            string query = null;

            if (customerVm.PSWD != null)
            {
                query = @"UPDATE Customer SET FRST_NME = @FRST_NME, LAST_NME = @LAST_NME, EMAIL = @EMAIL, PHNE = @PHNE, USR_NME = @USR_NME, PSWD = @PSWD WHERE ID = @ID";

                Conn.Execute(query, new { customerVm.FRST_NME, customerVm.LAST_NME, customerVm.EMAIL, customerVm.PHNE, customerVm.USR_NME, customerVm.PSWD, customerVm.ID });
            }
            else
            {
                query = @"UPDATE Customer SET FRST_NME = @FRST_NME, LAST_NME = @LAST_NME, EMAIL = @EMAIL, PHNE = @PHNE, USR_NME = @USR_NME WHERE ID = @ID";

                Conn.Execute(query, new { customerVm.FRST_NME, customerVm.LAST_NME, customerVm.EMAIL, customerVm.PHNE, customerVm.USR_NME, customerVm.ID });
            }

        }

        public CustomerModel getPassword(int id)
        {
            using (Conn)
            {
                string query = @"SELECT * FROM Customer WHERE ID = @ID";

                return Conn.QueryFirstOrDefault<CustomerModel>(query, new { @ID = id });
            }
        }

        public bool CheckUsername(string username)
        {
            try
            {
                using (Conn)
                {
                    string query = @"SELECT count(DISTINCT 1) FROM Customer WHERE USR_NME = @USR_NME";

                    var exists = Conn.ExecuteScalar<bool>(query, new { @USR_NME = username });
                    return exists;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }

        public void InsertAddress(CustomerModel customerVm)
        {
            using (Conn)
            {
                string query = "INSERT INTO Address (USER_ID, Address, CITY, Type) VALUES (@USER_ID, @Address, @CITY, @Type)";
                Conn.Execute(query, new { USER_ID = customerVm.ID, customerVm.Address, customerVm.CITY, Type = "Customer" });
            }
        }

        public string getprofilepicpath(int id)
        {
            using (Conn)
            {
                string query = @"SELECT Path FROM Images WHERE FId = @FId AND Type = @Type";

                return Conn.QueryFirstOrDefault<string>(query, new { FId = id, Type = "Customer" });
            }
        }

        public void profilePic(ProfilePicModel photo)
        {
            if (photo.Action == "Update")
            {
                string query = @"UPDATE Images SET Path = @Path WHERE FId = @FId AND Type = @Type";

                Conn.Execute(query, new { Path = photo.Path, FId = photo.Id, Type = "Customer" });
            }
            else if (photo.Action == "Create")
            {
                string query = "INSERT INTO Images (Path, FId, Type) VALUES (@Path, @FId, @Type)";

                Conn.Execute(query, new { Path = photo.Path, FId = photo.Id, Type = photo.Type });
            }
        }
    }
}