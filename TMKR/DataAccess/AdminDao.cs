using Dapper;
using System.Data;
using TMKR.Models.DataModel;

namespace TMKR.DataAccess
{
    public class AdminDao
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
        public AdminModel ValidateUser(LoginCredentialsModel credentials)
        {
            using (Conn)
            {
                string query = @"SELECT * FROM Admin WHERE Username = @Username and IsActive = 1";

                return Conn.QueryFirstOrDefault<AdminModel>(query, new { credentials.Username });
            }
        }
    }
}