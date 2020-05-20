using System;
using System.Collections.Generic;
using System.Linq;
using TMKR.DataAccess;
using TMKR.Models.DataModel;

namespace TMKR.Managers
{
    public class Purchase_OrderManager
    {
        PurchaseOrderDao purchaseOrderDao = new PurchaseOrderDao();

        public List<PurchaseOrderChildModel> GetPurchaseOrdersChild(int id)
        {
            List<PurchaseOrderChildModel> orders = purchaseOrderDao.GetPurchaseOrdersChild(id);
            for (int i = 0; i < orders.Count; i++)
            {
                if (orders[i].Status == "Draft")
                {
                    string status = "Pending";
                    orders[i].Status = status;
                    purchaseOrderDao.UpdateOrderStatus(orders[i].ID, status);
                }
            }
            return orders;
        }

        public List<PurchaseOrderParentModel> GetPurchaseOrdersParent(int id)
        {
            List<PurchaseOrderParentModel> orders = purchaseOrderDao.GetPurchaseOrdersParent(id);
            return orders;
        }

        public void AcceptOrder(int id) {
            purchaseOrderDao.UpdateOrderStatus(id,"Accepted");
        }

        public void RejectOrder(int id)
        {
            purchaseOrderDao.UpdateOrderStatus(id,"Rejected");
        }

        public void OrderStatus(ActionDataModel data)
        {
            purchaseOrderDao.UpdateOrderStatus(data);
        }

        public List<PurchaseOrderModel> PurchaseOrderList(int vendorId, string type)
        {
            var orders = purchaseOrderDao.PurchaseOrderList(vendorId, type);
            return orders;
        }

        public List<PurchaseOrderParentModel> GetPurchaseOrdersNew(int vndrId) {

            List<PurchaseOrderModel> purchaseOrders = PurchaseOrderList(vndrId,"New");
            foreach (var purchaseorder in purchaseOrders)
            {
                if (purchaseorder.STATUS == "Draft")
                {
                    purchaseorder.STATUS = "Pending";
                    updateStatus(purchaseorder.PurchaseOrderId, "Pending");
                }
            }
            List<PurchaseOrderParentModel> result = new List<PurchaseOrderParentModel>();
            var groupedPO = purchaseOrders.GroupBy(t => new { t.CART_ID, t.CustomerID });
            foreach (var group in groupedPO)
            {
                PurchaseOrderParentModel parentModel = new PurchaseOrderParentModel();
                parentModel.CART_ID = group.FirstOrDefault().CART_ID;
                parentModel.FirstName = group.FirstOrDefault().FirstName;
                parentModel.Phone = group.FirstOrDefault().PHNE;
                parentModel.SHPNG_ADRS = group.FirstOrDefault().SHPNG_ADRS;
                parentModel.Total = group.Sum(t => t.ItemAmount);
                parentModel.STATUS = group.FirstOrDefault().STATUS;

                parentModel.purchaseorderdetail = new List<PurchaseOrderChildModel>();
                foreach (var item in group)
                {
                    PurchaseOrderChildModel child = new PurchaseOrderChildModel();
                    child.ProdName = item.ProductName;
                    child.Quantity = item.Quantity;
                    child.Status = item.STATUS;
                    child.Unit_Price = item.UnitPrice;
                    child.TotalAmount = item.UnitPrice * item.Quantity;
                    child.ID = item.PurchaseOrderId;
                    parentModel.purchaseorderdetail.Add(child);
                }

                result.Add(parentModel);
            }
            return result;
        }

        public List<PurchaseOrderParentModel> GetPurchaseOrdersOld(int vndrId,string type)
        {

            List<PurchaseOrderModel> purchaseOrders = PurchaseOrderList(vndrId, type);

            List<PurchaseOrderParentModel> result = new List<PurchaseOrderParentModel>();
            var groupedPO = purchaseOrders.GroupBy(t => new { t.CART_ID, t.CustomerID });
            foreach (var group in groupedPO)
            {
                PurchaseOrderParentModel parentModel = new PurchaseOrderParentModel();
                parentModel.CART_ID = group.FirstOrDefault().CART_ID;
                parentModel.FirstName = group.FirstOrDefault().FirstName;
                parentModel.Phone = group.FirstOrDefault().PHNE;
                parentModel.SHPNG_ADRS = group.FirstOrDefault().SHPNG_ADRS;
                parentModel.Total = group.Sum(t => t.ItemAmount);
                parentModel.STATUS = group.FirstOrDefault().STATUS;

                parentModel.purchaseorderdetail = new List<PurchaseOrderChildModel>();
                foreach (var item in group)
                {
                    PurchaseOrderChildModel child = new PurchaseOrderChildModel();
                    child.ProdName = item.ProductName;
                    child.Quantity = item.Quantity;
                    child.Status = item.STATUS;
                    child.Unit_Price = item.UnitPrice;
                    child.TotalAmount = item.UnitPrice * item.Quantity;
                    child.ID = item.PurchaseOrderId;
                    parentModel.purchaseorderdetail.Add(child);
                }

                result.Add(parentModel);
            }
            return result;
        }

        public void updateStatus(int purchaseOrderId, string v)
        {
            purchaseOrderDao.UpdateOrderStatus(purchaseOrderId,v);
        }
    }
}