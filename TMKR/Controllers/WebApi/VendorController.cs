using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using TKDR.Web.Helpers;
using TMKR.Helpers;
using TMKR.Managers;
using TMKR.Models.DataModel;
using TMKR.Models.ViewModel;

namespace TMKR.Controllers.WebApi
{
    public class VendorController : ApiController
    {
        VendorManager vendorManager = new VendorManager();
        CustomerManager customerManager = new CustomerManager();
        Prod_AdvtManager prodAdvtManager = new Prod_AdvtManager();
        Purchase_OrderManager purchaseOrderManager = new Purchase_OrderManager();
        private readonly string workingFolder = HttpRuntime.AppDomainAppPath + @"\Resources\images";

        [HttpPost]
        public HttpResponseMessage Login([FromBody]LoginCredentialsModel loginVm)
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
                List<ProductTypeModel> prodtypes = prodAdvtManager.getProductTypes();
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
                var id = prodAdvtManager.advtPost(advtVM);
                advtVM.ID = id;
                if (advtVM.Path != null)
                {
                    prodAdvtManager.addImagePath(advtVM);
                }
                else
                {
                    advtVM.Path = "../../../images/default.jpg";
                    prodAdvtManager.addImagePath(advtVM);
                }
                return Request.CreateResponse(HttpStatusCode.OK, "Advertisement Saved Successfully");
            }
            return Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "invalid request");
        }

        [HttpGet]
        public HttpResponseMessage GetPurchaseOrders(int vndrId)
        {
            try
            {
                PurchaseOrderTypesModel result = new PurchaseOrderTypesModel();

                result.New = purchaseOrderManager.GetPurchaseOrdersNew(vndrId);

                result.Accepted = purchaseOrderManager.GetPurchaseOrdersOld(vndrId, "Accepted");

                result.Rejected = purchaseOrderManager.GetPurchaseOrdersOld(vndrId, "Rejected");

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

                Purchase_OrderModel purchaseOrders = new Purchase_OrderModel();

                purchaseOrders.parent = purchaseOrdersParent;

                purchaseOrders.child = purchaseOrdersChild;

                return Request.CreateResponse(HttpStatusCode.OK, purchaseOrders);
            }
            catch (Exception)
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
        public HttpResponseMessage GetAdvt(int advtId)
        {
            try
            {
                ActiveAdvtModel prodAdvt = prodAdvtManager.getProdAdvt(advtId);

                prodAdvt.ImagePath = prodAdvtManager.getImagePath(advtId);

                return Request.CreateResponse(HttpStatusCode.OK, prodAdvt);
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

        [HttpPost]
        public HttpResponseMessage OrderAction(ActionDataModel data)
        {
            if (data != null)
            {
                purchaseOrderManager.OrderStatus(data);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            return Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "invalid request");
        }

        [HttpPost]
        public HttpResponseMessage UpdateAdvt([FromBody]ActiveAdvtModel advtVM)
        {
            if (advtVM != null)
            {
                prodAdvtManager.updateAdvt(advtVM);
                prodAdvtManager.updateAdvtPic(advtVM);
                return Request.CreateResponse(HttpStatusCode.OK, "Advertisement Saved Successfully");
            }
            return Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "invalid request");
        }
        
        [HttpPost]
        public HttpResponseMessage UpdateProfile([FromBody]VendorModel vendorVm)
        {
            if (vendorVm != null && vendorManager.ValidatePassword(vendorVm))
            {
                if (vendorVm.PSWD != null)
                {
                    vendorVm.PSWD = PasswordHasher.HashPassword(vendorVm.PSWD);
                }
                VendorModel vendor = vendorManager.Update(vendorVm);

                return Request.CreateResponse(HttpStatusCode.OK, vendor);

            }
            return Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "Password Incorrect");
        }

        [HttpPost]
        public HttpResponseMessage UpdateProfilePic([FromBody]ProfilePicModel photo)
        {

            if (photo != null)
            {
                photo.Action = "Update";

                vendorManager.ProfilePic(photo);

                return Request.CreateResponse(HttpStatusCode.OK, "Picture Updated Successfully");
            }
            return Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "invalid request");
        }

        [HttpGet]
        public HttpResponseMessage GetProfilePicPath(int vendorid)
        {
            try
            {
                string Path = vendorManager.getPrfilePicPath(vendorid);

                return Request.CreateResponse(HttpStatusCode.OK, Path);
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

            config.Routes.MapHttpRoute(
                "OrderAction",
                "api/vendor/orderaction",
                new { controller = "Vendor", action = "OrderAction" });

            config.Routes.MapHttpRoute(
                "GetAdvt",
                "api/vendor/{advtId}/advtdetail",
                new { controller = "Vendor", action = "GetAdvt" });

            config.Routes.MapHttpRoute(
                "UpdateAdvertisement",
                "api/vendor/updateAdvt",
                new { controller = "Vendor", action = "UpdateAdvt" });

            config.Routes.MapHttpRoute(
                "UpdateVendorProfile",
                "api/vendor/updatevendorprofile",
                new { controller = "Vendor", action = "UpdateProfile" });

            config.Routes.MapHttpRoute(
                "UpdateVendorProfilePic",
                "api/vendor/updatevendorprofilepic",
                new { controller = "Vendor", action = "UpdateProfilePic" });

            config.Routes.MapHttpRoute(
                "GetVendorProfilePicPath",
                "api/vendor/getVendorProfilePicPath/{vendorid}",
                new { controller = "Vendor", action = "GetProfilePicPath" });
        }
    }
}
