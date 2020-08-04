using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using TMKR.Models.DataModel;

namespace TMKR.DataAccess
{
    public class ProductTypeDao
    {
        private IDbConnection _con;

        public IDbConnection Conn
        {
            get
            {
                return _con = ConnectionFactory.CreateConnection();
            }
        }

        public List<ProductTypeModel> GetProductTypes()
        {
            using (Conn)
            {
                string sql = "SELECT * FROM Product_Type where IsActive = 1";
                List<ProductTypeModel> productTypes = Conn.Query<ProductTypeModel>(sql).ToList();
                return productTypes;
            }
        }
    }
}