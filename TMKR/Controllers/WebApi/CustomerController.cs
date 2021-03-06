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
    public class CustomerController : ApiController
    {

        CustomerManager customerManager = new CustomerManager();
        VendorManager vendorManager = new VendorManager();
        Prod_AdvtManager prod_AdvtManager = new Prod_AdvtManager();
        CartManager cartManager = new CartManager();
        Purchase_OrderManager purchsaeordermanager = new Purchase_OrderManager();

        //Login WEB API Call
        [HttpPost]
        public HttpResponseMessage Login([FromBody]LoginCredentialsModel credentials)
        {
            if (credentials != null && !string.IsNullOrEmpty(credentials.Username))
            {
                CustomerModel customer = customerManager.Login(credentials);
                if (customer == null)
                {
                    var message = string.Format("Credentials are invalid!");
                    return Request.CreateResponse(HttpStatusCode.NotFound, message);
                }
                return Request.CreateResponse(HttpStatusCode.OK, customer);
            }
            return Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "Invalid Credentials. No matching user found!");
        }

        //Register WEB API Call
        [HttpPost]
        public HttpResponseMessage Register([FromBody]CustomerModel customerVm)
        {
            if (customerVm != null)
            {
                customerVm.PSWD = PasswordHasher.HashPassword(customerVm.PSWD);
                customerManager.Create(customerVm);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            return Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "invalid request");
        }

        //Update Profile WEB API Call
        [HttpPost]
        public HttpResponseMessage UpdateProfile([FromBody]CustomerProfileModel customerVm)
        {
            if (customerVm != null && customerManager.ValidatePassword(customerVm))
            {
                if (customerVm.PSWD != null)
                {
                    customerVm.PSWD = PasswordHasher.HashPassword(customerVm.PSWD);
                }
                CustomerModel customer = customerManager.Update(customerVm);

                return Request.CreateResponse(HttpStatusCode.OK, customer);

            }
            return Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "Password Incorrect");
        }

        //Get Products WEB API Call***
        [HttpGet]
        public HttpResponseMessage GetProducts()
        {
            try
            {
                var advts = prod_AdvtManager.getProd_Advts().ToArray();
                return Request.CreateResponse(HttpStatusCode.OK, advts);
            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, e.Message);
            }

        }

        //get single product***
        [HttpGet]
        public HttpResponseMessage GetProduct(int advtid)
        {
            try
            {
                Prod_AdvtModel prodAdvt = prod_AdvtManager.getProduct(advtid);

                return Request.CreateResponse(HttpStatusCode.OK, prodAdvt);
            }
            catch (Exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Exception Occoured in reading data.");
            }
        }


        //Save Cart WEB API Call
        [HttpPost]
        public HttpResponseMessage SaveCart([FromBody]ShoppingCartModel cart)
        {
            if (cart != null && cart.user != null && cart.items != null && cart.items.Any())
            {
                cartManager.addCartItems(cart);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            return Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "invalid request");
        }

        [HttpGet]
        public HttpResponseMessage validateUsername(string username)
        {
            bool valid = false;
            try
            {
                valid = customerManager.checkUsername(username);
                if (!valid)
                {
                    valid = vendorManager.checkUsername(username);
                }
                return Request.CreateResponse(HttpStatusCode.OK, valid);
            }
            catch (Exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Exception Occoured in reading data.");
            }
        }

        [HttpGet]
        public HttpResponseMessage GetProfilePicPath(int customerid)
        {
            try
            {
                string Path = customerManager.getPrfilePicPath(customerid);

                return Request.CreateResponse(HttpStatusCode.OK, Path);
            }
            catch (Exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Exception Occoured in reading data.");
            }
        }

        [HttpPost]
        public HttpResponseMessage UpdateProfilePic([FromBody]ProfilePicModel photo)
        {

            if (photo != null)
            {
                photo.Action = "Update";

                customerManager.ProfilePic(photo);

                return Request.CreateResponse(HttpStatusCode.OK, "Picture Updated Successfully");
            }
            return Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "invalid request");
        }

        //get orders of customers***
        [HttpGet]
        public HttpResponseMessage GetOrders(int Id)
        {
            try
            {
                OrderTypesModel result = new OrderTypesModel();

                result.Pending = cartManager.GetOrders(Id, "Pending");

                result.Accepted = cartManager.GetOrders(Id, "Accepted");

                result.Rejected = cartManager.GetOrders(Id, "Rejected");

                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Exception Occoured in reading data.");
            }
        }

        [HttpPost]
        public HttpResponseMessage CancelOrder(int cartId)
        {

            purchsaeordermanager.CancelOrder(cartId);

            return Request.CreateErrorResponse(HttpStatusCode.OK, "Order Cancelled Succcessfully");
        }

        [HttpPost]
        public HttpResponseMessage CancelOrderItem(int itemId)
        {

            purchsaeordermanager.CancelOrderItem(itemId);

            return Request.CreateErrorResponse(HttpStatusCode.OK, "Order Cancelled Succcessfully");
        }

        [HttpGet]
        public HttpResponseMessage GetRates()
        {
            try
            {
                List<RateModel> rates = customerManager.getRates();

                return Request.CreateResponse(HttpStatusCode.OK, rates);
            }
            catch (Exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Exception Occoured in reading data.");
            }
        }

        [HttpPost]
        public HttpResponseMessage SendMessage(MessageModel message)
        {
            try
            {
                customerManager.sendMessage(message);
                return Request.CreateResponse(HttpStatusCode.OK, "Order Cancelled Succcessfully");
            }
            catch (Exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Operation Failed this time .. ");
            }
        }


        //WebApi Route Configuration
        public static void ConfigureRoutes(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                "CustomerLogin",
                "api/customer/login",
                new { controller = "Customer", action = "Login" });

            config.Routes.MapHttpRoute(
                "CustomerRegister",
                "api/customer/register",
                new { controller = "Customer", action = "Register" });

            config.Routes.MapHttpRoute(
                "PlaceOrder",
                "api/customer/placeorder",
                new { controller = "Customer", action = "GetProducts" });

            config.Routes.MapHttpRoute(
                "SaveCart",
                "api/customer/savecart",
                new { controller = "Customer", action = "SaveCart" });

            config.Routes.MapHttpRoute(
                "UpdateCustomerProfile",
                "api/customer/updatecustomerprofile",
                new { controller = "Customer", action = "UpdateProfile" });

            config.Routes.MapHttpRoute(
                "ValidateCustomerUsername",
                "api/customer/validateUsername",
                new { controller = "Customer", action = "validateUsername" });

            config.Routes.MapHttpRoute(
                "GetCustomerProfilePicPath",
                "api/customer/getCustomerProfilePicPath/{customerid}",
                new { controller = "Customer", action = "GetProfilePicPath" });

            config.Routes.MapHttpRoute(
                "UpdateCustomerProfilePic",
                "api/customer/updatecustomerprofilepic",
                new { controller = "Customer", action = "UpdateProfilePic" });

            config.Routes.MapHttpRoute(
                "GetOrder",
                "api/customer/{Id}/getOrders",
                new { controller = "Customer", action = "GetOrders" });

            config.Routes.MapHttpRoute(
                "GetProdAdvt",
                "api/customer/getProdAdvt/{AdvtId}",
                new { controller = "Customer", action = "GetProduct" });

            config.Routes.MapHttpRoute(
                "CancelOrder",
                "api/customer/cancelorder/{cartId}",
                new { controller = "Customer", action = "CancelOrder" });

            config.Routes.MapHttpRoute(
                "CancelOrderItem",
                "api/customer/cancelorderitem/{itemId}",
                new { controller = "Customer", action = "CancelOrderItem" });

            config.Routes.MapHttpRoute(
                "GetRates",
                "api/customer/getRates",
                new { controller = "Customer", action = "GetRates" });

            config.Routes.MapHttpRoute(
                "SendMessage",
                "api/customer/sendmessage",
                new { controller = "Customer", action = "SendMessage" });
        }

    }
}
