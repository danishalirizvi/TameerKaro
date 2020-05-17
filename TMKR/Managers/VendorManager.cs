using System;
using TKDR.Web.Helpers;
using TMKR.DataAccess;
using TMKR.Models.DataModel;

namespace TMKR.Managers
{
    public class VendorManager
    {
        VendorDao vendordao = new VendorDao();

        public bool Create(VendorModel vendorVm) {
            int user_id = vendordao.Insert(vendorVm);
            vendorVm.ID = user_id;
            vendordao.InsertAddress(vendorVm);
            return true;
        }

        public void resetPass() {
            vendordao.resetPass();
        }


        public VendorModel Login(LoginCredentials loginVm)
        {
            VendorModel vendorVm = vendordao.ValidateUser(loginVm);
            if (vendorVm != null)
            {
                if (PasswordHasher.ValidatePassword(loginVm.Password, vendorVm.PSWD))
                {
                    return vendorVm;
                }
            }
            return null;
        }

        public void updateProfile(VendorModel model, int id ){
            vendordao.UpdateProfile(model,id);
        }

        public bool validateUsername(string username) {
            if (vendordao.ValidateUserName(username))
            {
                return true;
            }
            else {
                return false;
            }
        }


        public bool checkUsername(string username)
        {
            return vendordao.CheckUsername(username);
        }

    }
}