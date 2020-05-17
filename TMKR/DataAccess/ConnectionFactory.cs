using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace TMKR.DataAccess
{
    public class ConnectionFactory
    {
        private static readonly string connString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

        public static IDbConnection CreateConnection()
        {
            IDbConnection conn = null;
            conn = new SqlConnection(connString);
            conn.Open();
            return conn;
        }
    }
}