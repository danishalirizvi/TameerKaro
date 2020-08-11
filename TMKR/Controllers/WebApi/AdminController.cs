using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TMKR.Managers;
using TMKR.Models.DataModel;

namespace TMKR.Controllers.WebApi
{
    public class AdminController : ApiController
    {
        AdminManager adminManager = new AdminManager();
        CustomerManager customerManager = new CustomerManager();
        VendorManager vendorManger = new VendorManager();
        Prod_AdvtManager prod_AdvtManager = new Prod_AdvtManager();
        Purchase_OrderManager purchaseOrderManager = new Purchase_OrderManager();
        CartManager cartManager = new CartManager();

        //Login WEB API Call
        [HttpPost]
        public HttpResponseMessage Login([FromBody]LoginCredentialsModel credentials)
        {
            if (credentials != null && !string.IsNullOrEmpty(credentials.Username))
            {
                AdminModel admin = adminManager.Login(credentials);
                if (admin == null)
                {
                    var message = string.Format("Credentials are invalid!");
                    return Request.CreateResponse(HttpStatusCode.NotFound, message);
                }
                return Request.CreateResponse(HttpStatusCode.OK, admin);
            }
            return Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "Invalid Credentials. No matching user found!");
        }


        //Get Customers WEB API Call
        [HttpGet]
        public HttpResponseMessage GetCustomers()
        {
            try
            {
                List<CustomerModel> customers = customerManager.getCustomers();
                return Request.CreateResponse(HttpStatusCode.OK, customers);
            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, e.Message);
            }

        }


        //Get Vendos WEB API Call
        [HttpGet]
        public HttpResponseMessage GetVendors()
        {
            try
            {
                List<VendorModel> customers = vendorManger.getVendors();
                return Request.CreateResponse(HttpStatusCode.OK, customers);
            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, e.Message);
            }

        }


        //Get Orders WEB API Call
        [HttpGet]
        public HttpResponseMessage GetAdvertisements()
        {
            try
            {
                List<Prod_AdvtModel> advts = prod_AdvtManager.getAdvertisements();
                return Request.CreateResponse(HttpStatusCode.OK, advts);
            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, e.Message);
            }

        }


        [HttpGet]
        public HttpResponseMessage GetOrders()
        {
            try
            {
                List< OrdersParentModelAdmin> result = new List<OrdersParentModelAdmin>();

                result = purchaseOrderManager.GetOrdersAdmmin();

                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Exception Occoured in reading data.");
            }
        }


        [HttpPost]
        public HttpResponseMessage BlockCustomer(int customerId)
        {

            customerManager.blockCustomer(customerId);

            return Request.CreateErrorResponse(HttpStatusCode.OK, "Advertisement Deleted Successfully");
        }


        [HttpPost]
        public HttpResponseMessage UnBlockCustomer(int customerId)
        {

            customerManager.unblockCustomer(customerId);

            return Request.CreateErrorResponse(HttpStatusCode.OK, "Advertisement Deleted Successfully");
        }


        [HttpPost]
        public HttpResponseMessage BlockVendor(int vendorId)
        {

            vendorManger.blockVendor(vendorId);

            return Request.CreateErrorResponse(HttpStatusCode.OK, "Advertisement Deleted Successfully");
        }


        [HttpPost]
        public HttpResponseMessage UnBlockVendor(int vendorId)
        {

            vendorManger.unblockVendor(vendorId);

            return Request.CreateErrorResponse(HttpStatusCode.OK, "Advertisement Deleted Successfully");
        }


        [HttpPost]
        public HttpResponseMessage BlockAdvt(int advtId)
        {

            prod_AdvtManager.blockAdvt(advtId);

            return Request.CreateErrorResponse(HttpStatusCode.OK, "Advertisement Deleted Successfully");
        }


        [HttpPost]
        public HttpResponseMessage UnBlockAdvt(int advtId)
        {

            prod_AdvtManager.unblockAdvt(advtId);

            return Request.CreateErrorResponse(HttpStatusCode.OK, "Advertisement Deleted Successfully");
        }

        [HttpPost]
        public HttpResponseMessage SuspendOrder(int cartId)
        {

            cartManager.suspendOrder(cartId);

            return Request.CreateErrorResponse(HttpStatusCode.OK, "Advertisement Deleted Successfully");
        }


        [HttpPost]
        public HttpResponseMessage ResumeOrder(int cartId)
        {

            cartManager.resumeOrder(cartId);

            return Request.CreateErrorResponse(HttpStatusCode.OK, "Advertisement Deleted Successfully");
        }

        [HttpPost]
        public HttpResponseMessage SuspendSingleOrder(int orderId)
        {

            cartManager.suspendSingleOrder(orderId);

            return Request.CreateErrorResponse(HttpStatusCode.OK, "Advertisement Deleted Successfully");
        }


        [HttpPost]
        public HttpResponseMessage ResumeSingleOrder(int orderId)
        {
            

            cartManager.resumeSingleOrder(orderId);

            return Request.CreateErrorResponse(HttpStatusCode.OK, "Advertisement Deleted Successfully");
        }


        [HttpPost]
        public HttpResponseMessage UpdateRate(RateDataModel data)
        {
            adminManager.updateRate(data);

            return Request.CreateErrorResponse(HttpStatusCode.OK, "Rate Updated Successfully");
        }


        [HttpGet]
        public HttpResponseMessage GetMesseges()
        {
            try
            {
                List<MessageModel> result = new List<MessageModel>();

                result = adminManager.GetMessages();

                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Exception Occoured in reading data.");
            }
        }


        //WebApi Route Configuration
        public static void ConfigureRoutes(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                "AdminLogin",
                "api/admin/login",
                new { controller = "Admin", action = "Login" });

            config.Routes.MapHttpRoute(
                "GetCustomers",
                "api/admin/getCustomers",
                new { controller = "Admin", action = "GetCustomers" });

            config.Routes.MapHttpRoute(
                "GetVendors",
                "api/admin/getVendors",
                new { controller = "Admin", action = "GetVendors" });

            config.Routes.MapHttpRoute(
                "GetAdvertisements",
                "api/admin/getAdvertisements",
                new { controller = "Admin", action = "GetAdvertisements" });

            config.Routes.MapHttpRoute(
                "GetOrders",
                "api/admin/getOrders",
                new { controller = "Admin", action = "GetOrders" });

            config.Routes.MapHttpRoute(
                "BlockCustomer",
                "api/admin/blockCustomer/{customerId}",
                new { controller = "Admin", action = "BlockCustomer" });

            config.Routes.MapHttpRoute(
                "UnBlockCustomer",
                "api/admin/unblockCustomer/{customerId}",
                new { controller = "Admin", action = "UnBlockCustomer" });

            config.Routes.MapHttpRoute(
                "BlockVendor",
                "api/admin/blockVendor/{vendorId}",
                new { controller = "Admin", action = "BlockVendor" });

            config.Routes.MapHttpRoute(
                "UnBlockVendor",
                "api/admin/unblockVendor/{vendorId}",
                new { controller = "Admin", action = "UnBlockVendor" });

            config.Routes.MapHttpRoute(
                "BlockAdvt",
                "api/admin/blockAdvt/{advtid}",
                new { controller = "Admin", action = "BlockAdvt" });

            config.Routes.MapHttpRoute(
                "UnBlockAdvt",
                "api/admin/unblockAdvt/{advtid}",
                new { controller = "Admin", action = "UnBlockAdvt" });

            config.Routes.MapHttpRoute(
                "SuspendOrder",
                "api/admin/suspendOrder/{cartid}",
                new { controller = "Admin", action = "SuspendOrder" });

            config.Routes.MapHttpRoute(
                "ResumeOrder",
                "api/admin/resumeOrder/{cartid}",
                new { controller = "Admin", action = "ResumeOrder" });

            config.Routes.MapHttpRoute(
                "SuspendSingleOrder",
                "api/admin/suspendSingleOrder/{orderId}",
                new { controller = "Admin", action = "SuspendSingleOrder" });

            config.Routes.MapHttpRoute(
                "ResumeSingleOrder",
                "api/admin/resumeSingleOrder/{orderId}",
                new { controller = "Admin", action = "ResumeSingleOrder" });

            config.Routes.MapHttpRoute(
                "UpdateRate",
                "api/admin/updateRate",
                new { controller = "Admin", action = "UpdateRate" });

            config.Routes.MapHttpRoute(
                "GetMesseges",
                "api/admin/getMessages",
                new { controller = "Admin", action = "GetMesseges" });
        }
    }
}
