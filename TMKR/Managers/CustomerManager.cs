﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TKDR.Web.Helpers;
using TMKR.DataAccess;
using TMKR.Models.DataModel;

namespace TMKR.Managers
{
    public class CustomerManager
    {
        CustomerDao customerDao = new CustomerDao();

        //User Login
        public CustomerModel Login(LoginCredentialsModel credentials)
        {
            CustomerModel customer = customerDao.ValidateUser(credentials);
            if (customer != null)
            {
                if (PasswordHasher.ValidatePassword(credentials.Password, customer.PSWD))
                {
                    return customer;
                }
            }
            return null;
        }

        //User Registeration
        public void Create(CustomerModel customerVm)
        {
            int user_id = customerDao.Insert(customerVm);
            customerVm.ID = user_id;
            customerDao.InsertAddress(customerVm);
        }

        //Profile Update
        public CustomerModel Update(CustomerProfileModel customerVm)
        {
            customerDao.update(customerVm);

            customerDao.updateAddress(customerVm);

            CustomerModel customer = customerDao.GetUser(customerVm.ID);
            return customer;
        }

        public bool ValidatePassword(CustomerProfileModel customerVm)
        {
            string password = customerDao.getPassword(customerVm.ID).PSWD;
            if (PasswordHasher.ValidatePassword(customerVm.CRNT_PSWD, password))
            {
                return true;
            }
            return false;
        }

        public bool checkUsername(string username) {
            return customerDao.CheckUsername(username);
        }
    }
}