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

        public List<ProductType> GetProductTypes()
        {
            using (Conn)
            {
                string sql = "SELECT * FROM Product_Type";
                List<ProductType> productTypes = Conn.Query<ProductType>(sql).ToList();
                return productTypes; //Conn.Execute(query);
            }
        }
    }
}