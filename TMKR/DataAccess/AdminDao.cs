using Dapper;
using System.Data;
using TMKR.Models.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;

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

        public void unsetOldRate(RateDataModel rate)
        {
            using (Conn)
            {
                string query = @"UPDATE Rates SET ExpiryDate = @ExpiryDate, IsActive = @IsActive WHERE Prod_Type_ID = @Prod_Type_ID";

                Conn.Execute(query, new { ExpiryDate = DateTime.Now, IsActive = false, Prod_Type_ID = rate.Prod_Type_ID });
            }
        }

        public void setRate(RateModel rate)
        {
            using (Conn)
            {
                string query = @"INSERT INTO Rates (Prod_Type_ID, EntryDate, Rate, IsActive) VALUES (@Prod_Type_ID, @EntryDate, @Rate, @IsActive)";

                Conn.Execute(query, new { Prod_Type_ID = rate.Prod_Type_ID, EntryDate = rate.EntryDate, Rate = rate.Rate, IsActive = true});
            }
        }

        internal List<MessageModel> getMessages()
        {
            using (Conn)
            {
                string query = @"SELECT * FROM Messages where IsActive = 1";
                
                return Conn.Query<MessageModel>(query).ToList();
            }
        }
    }
}