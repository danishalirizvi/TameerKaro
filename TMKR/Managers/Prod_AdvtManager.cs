using System;
using System.Collections.Generic;
using TMKR.DataAccess;
using TMKR.Models.DataModel;

namespace TMKR.Managers
{
    public class Prod_AdvtManager
    {
        Prod_AdvtDao prod_AdvtDao = new Prod_AdvtDao();
        ProductTypeDao productTypeDao = new ProductTypeDao();
        StatusDao statusDao = new StatusDao();
        VendorDao vendorDao = new VendorDao();

        //Get Product Advertisements
        public List<Prod_AdvtModel> getProd_Advts()
        {
            return prod_AdvtDao.GetProd_Advts();
        }

        public List<ProductTypeModel> getProductTypes()
        {
            List<ProductTypeModel> list = productTypeDao.GetProductTypes();
            return list;
        }

        public List<StatusModel> getAdvtStatus()
        {
            List<StatusModel> list = statusDao.GetAdvtStatus();
            return list;
        }

        public int advtPost(ProdAdvertisementModel model)
        {
            model.POST_DATE = DateTime.Now;
            var id = prod_AdvtDao.Insert(model);
            return id;
        }

        public List<ActiveAdvtModel> getProdAdvts(int vndrId)
        {
            return prod_AdvtDao.GetProd_Advts(vndrId);
        }

        public ActiveAdvtModel getProdAdvt(int advtId)
        {
            return prod_AdvtDao.GetProd_Advt(advtId);
        }

        public void updateAdvt(ActiveAdvtModel advtVM)
        {
            prod_AdvtDao.updateAdvt(advtVM);
        }

        public void addImagePath(ProdAdvertisementModel advtVM)
        {
            prod_AdvtDao.addImagePath(advtVM);
        }

        public string getImagePath(int advtId)
        {
            return vendorDao.getpicpath(advtId, "Advertisement");
        }

        public void updateAdvtPic(ActiveAdvtModel advtVM)
        {
            ProfilePicModel photo = new ProfilePicModel() {
                Path = advtVM.ImagePath,
                Id = advtVM.ID,
                Action = "Update",
                Type = "Advertisement"
            };
            
            vendorDao.Pic(photo);
        }
    }
}