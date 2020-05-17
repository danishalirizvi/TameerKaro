using System;
using System.Collections.Generic;
using TMKR.DataAccess;
using TMKR.Models.DataModel;

namespace TMKR.Managers
{
    public class Purchase_OrderManager
    {
        PurchaseOrderDao purchasOrderDao = new PurchaseOrderDao();

        public List<PurchaseOrderChildModel> GetPurchaseOrdersChild(int id)
        {
            List<PurchaseOrderChildModel> orders = purchasOrderDao.GetPurchaseOrdersChild(id);
            for (int i = 0; i < orders.Count; i++)
            {
                if (orders[i].Status == "Draft")
                {
                    string status = "Pending";
                    orders[i].Status = status;
                    purchasOrderDao.UpdateOrderStatus(orders[i].ID, status);
                }
            }
            return orders;
        }

        public List<PurchaseOrderParentModel> GetPurchaseOrdersParent(int id)
        {
            List<PurchaseOrderParentModel> orders = purchasOrderDao.GetPurchaseOrdersParent(id);
            return orders;
        }

        public void AcceptOrder(int id) {
            purchasOrderDao.UpdateOrderStatus(id,"Accepted");
        }

        public void RejectOrder(int id)
        {
            purchasOrderDao.UpdateOrderStatus(id,"Rejected");
        }

        public List<PurchaseOrderModel> PurchaseOrderList(int vendorId)
        {
            var orders = purchasOrderDao.PurchaseOrderList(vendorId);
            return orders;
        }
    }
}