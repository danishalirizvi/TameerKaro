﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TKDR.Web.Helpers;
using TMKR.Managers;
using TMKR.Models.DataModel;

namespace TMKR.Controllers.WebApi
{
    public class VendorController : ApiController
    {
        VendorManager vendorManager = new VendorManager();
        CustomerManager customerManager = new CustomerManager();
        Prod_AdvtManager prodAdvtManager = new Prod_AdvtManager();
        Purchase_OrderManager purchaseOrderManager = new Purchase_OrderManager();

        [HttpPost]
        public HttpResponseMessage Login([FromBody]LoginCredentials loginVm)
        {
            //vendorManager.resetPass();
            if (loginVm != null && !string.IsNullOrEmpty(loginVm.Username))
            {
                VendorModel vendor = vendorManager.Login(loginVm);
                if (vendor == null)
                {
                    var message = string.Format("user credential are invalid");
                    return Request.CreateResponse(HttpStatusCode.NotFound, message);
                }
                return Request.CreateResponse(HttpStatusCode.OK, vendor);
            }
            return Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "invalid request");
        }


        [HttpPost]
        public HttpResponseMessage Register([FromBody]VendorModel vendorVM)
        {
            if (vendorVM != null)
            {
                vendorVM.PSWD = PasswordHasher.HashPassword(vendorVM.PSWD);
                vendorManager.Create(vendorVM);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            return Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "invalid request");
        }

        [HttpGet]
        public HttpResponseMessage GetProdTypes()
        {
            try
            {
                List<ProductType> prodtypes = prodAdvtManager.getProductTypes();
                return Request.CreateResponse(HttpStatusCode.OK, prodtypes.ToArray());
            }
            catch (Exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Exception Occoured in reading data.");
            }
        }



        [HttpGet]
        public HttpResponseMessage GetAdvtStatus()
        {
            try
            {
                List<StatusModel> list = prodAdvtManager.getAdvtStatus();
                return Request.CreateResponse(HttpStatusCode.OK, list.ToArray());
            }
            catch (Exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Exception Occoured in reading data.");
            }
        }


        [HttpPost]
        public HttpResponseMessage CreateAdvt([FromBody]ProdAdvertisementModel advtVM)
        {
            if (advtVM != null)
            {
                prodAdvtManager.advtPost(advtVM);
                return Request.CreateResponse(HttpStatusCode.OK, "Advertisement Saved Successfully");
            }
            return Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "invalid request");
        }


        [HttpGet]
        public HttpResponseMessage GetPurchaseOrders(int vndrId)
        {
            try
            {
                List<PurchaseOrderModel> purchaseOrders = purchaseOrderManager.PurchaseOrderList(vndrId);
                List<PurchaseOrderParentModel> result = new List<PurchaseOrderParentModel>();
                var groupedPO = purchaseOrders.GroupBy(t => new { t.CART_ID, t.CustomerID });
                foreach (var group in groupedPO)
                {
                    PurchaseOrderParentModel parentModel = new PurchaseOrderParentModel();
                    parentModel.FirstName = group.FirstOrDefault().FirstName;
                    parentModel.Phone = group.FirstOrDefault().PHNE;
                    parentModel.SHPNG_ADRS = group.FirstOrDefault().SHPNG_ADRS;
                    parentModel.Total = group.Sum(t => t.ItemAmount);
                    parentModel.STATUS = group.FirstOrDefault().STATUS;

                    parentModel.purchaseorderdetail = new List<PurchaseOrderChildModel>();
                    foreach (var item in group) {
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

                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Exception Occoured in reading data.");
            }          
        }

        [HttpGet]
        public HttpResponseMessage GetPurchaseOrder(int vndrId)
        {
            try
            {
                List<PurchaseOrderParentModel> purchaseOrdersParent = purchaseOrderManager.GetPurchaseOrdersParent(vndrId);

                List<PurchaseOrderChildModel> purchaseOrdersChild = purchaseOrderManager.GetPurchaseOrdersChild(vndrId);

                Purchase_Order purchaseOrders = new Purchase_Order();

                purchaseOrders.parent = purchaseOrdersParent;

                purchaseOrders.child = purchaseOrdersChild;

                return Request.CreateResponse(HttpStatusCode.OK, purchaseOrders);
            }
            catch (Exception e)
            {

                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Exception Occoured in reading data.");
            }
        }


        [HttpGet]
        public HttpResponseMessage GetActiveAdvts(int vndrId)
        {
            try
            {
                List<ActiveAdvtModel> prodAdvts = prodAdvtManager.getProdAdvts(vndrId);

                return Request.CreateResponse(HttpStatusCode.OK, prodAdvts);
            }
            catch (Exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Exception Occoured in reading data.");
            }
        }

        [HttpGet]
        public HttpResponseMessage validateUsername(string username)
        {
            bool valid = false;
            try
            {
                valid = vendorManager.checkUsername(username);
                if (!valid)
                {
                    valid = customerManager.checkUsername(username);
                }
                return Request.CreateResponse(HttpStatusCode.OK, valid);
            }
            catch (Exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Exception Occoured in reading data.");
            }
        }

        public static void ConfigureRoutes(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                "VendorLogin",
                "api/vendor/login",
                new { controller = "Vendor", action = "Login" });

            config.Routes.MapHttpRoute(
                "VendorRegister",
                "api/vendor/Register",
                new { controller = "Vendor", action = "Register" });

            config.Routes.MapHttpRoute(
                "GetProductTypes",
                "api/vendor/getProdTypes",
                new { controller = "Vendor", action = "GetProdTypes" });

            config.Routes.MapHttpRoute(
                "CreateAdvtvertisement",
                "api/vendor/createAdvt",
                new { controller = "Vendor", action = "CreateAdvt" });

            config.Routes.MapHttpRoute(
                "GetPurchaseOrder",
                "api/vendor/{vndrId}/getPurchaseOrders",
                new { controller = "Vendor", action = "GetPurchaseOrders" });

            config.Routes.MapHttpRoute(
                "GetAdvtvertisementStatus",
                "api/vendor/getAdvtStatus",
                new { controller = "Vendor", action = "GetAdvtStatus" });

            config.Routes.MapHttpRoute(
                "GetActiveAdvtvertisement",
                "api/vendor/{vndrId}/activeAdts",
                new { controller = "Vendor", action = "GetActiveAdvts" });

            config.Routes.MapHttpRoute(
                "ValidateVendorUsername",
                "api/vendor/validateUsername",
                new { controller = "Vendor", action = "validateUsername" });
        }
    }
}
