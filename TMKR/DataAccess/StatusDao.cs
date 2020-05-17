using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using TMKR.Models.DataModel;

namespace TMKR.DataAccess
{
    public class StatusDao
    {
        private IDbConnection _con;

        public IDbConnection Conn
        {
            get
            {
                return _con = ConnectionFactory.CreateConnection();
            }
        }

        public List<StatusModel> GetAdvtStatus()
        {
            using (Conn)
            {
                string sql = "SELECT * FROM Status where Flag = @Flag";
                List<StatusModel> status = Conn.Query<StatusModel>(sql, new { @Flag = "PROD_ADVT" }).ToList();
                return status;
            }
        }
    }
}