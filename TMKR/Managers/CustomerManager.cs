using System;
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

            ProfilePicModel photo = new ProfilePicModel();

            photo.Id = user_id;
            photo.Path = "../../../images/a.png";
            photo.Type = "Customer";
            photo.Action = "Create";

            ProfilePic(photo);
        }

        //Profile Update
        public CustomerModel Update(CustomerProfileModel customerVm)
        {
            customerDao.update(customerVm);

            customerDao.updateAddress(customerVm);

            CustomerModel customer = customerDao.GetUser(customerVm.ID);
            return customer;
        }

        public List<CustomerModel> getCustomers()
        {
            return customerDao.getCustomers();
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

        public string getPrfilePicPath(int id)
        {
            return customerDao.getprofilepicpath(id);
        }

        public void ProfilePic(ProfilePicModel photo)
        {
            customerDao.profilePic(photo);
        }

        public void blockCustomer(int customerId)
        {
            customerDao.blockCustomer(customerId);
        }

        public void unblockCustomer(int customerId)
        {
            customerDao.unblockCustomer(customerId);
        }

        public List<RateModel> getRates()
        {
            return customerDao.getRates();
        }

        public void sendMessage(MessageModel message)
        {
            customerDao.sendMessage(message);
        }
    }
}