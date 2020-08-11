using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TKDR.Web.Helpers;
using TMKR.DataAccess;
using TMKR.Models.DataModel;

namespace TMKR.Managers
{
    public class AdminManager
    {
        AdminDao adminDao = new AdminDao();

        public AdminModel Login(LoginCredentialsModel credentials)
        {
            //string hashed = PasswordHasher.HashPassword(credentials.Password);
            AdminModel admin = adminDao.ValidateUser(credentials);
            if (admin != null)
            {
                if (PasswordHasher.ValidatePassword(credentials.Password, admin.Password))
                {
                    
                    return admin;
                }
            }
            return null;
        }

        public void updateRate(RateDataModel ratedata)
        {
            RateModel rate = new RateModel();

            adminDao.unsetOldRate(ratedata);

            rate.Prod_Type_ID = ratedata.Prod_Type_ID;
            rate.Rate = ratedata.Rate;
            rate.EntryDate = DateTime.Now;
            rate.IsActive = true;

            adminDao.setRate(rate);
        }

        public List<MessageModel> GetMessages()
        {
            return adminDao.getMessages();
        }
    }
}