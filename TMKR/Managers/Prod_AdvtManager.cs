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

        public void advtPost(ProdAdvertisementModel model)
        {
            model.POST_DATE = DateTime.Now;
            prod_AdvtDao.Insert(model);
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
    }
}