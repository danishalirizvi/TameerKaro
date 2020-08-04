﻿using System;
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
    }
}