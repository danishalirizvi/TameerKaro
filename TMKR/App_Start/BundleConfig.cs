using System.Web;
using System.Web.Optimization;

namespace TMKR
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            //bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
            //            "~/Scripts/jquery-{version}.js"));

            //bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
            //            "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            //bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
            //            "~/Scripts/modernizr-*"));

            //bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
            //          "~/Scripts/bootstrap.js",
            //          "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/style.css",
                      "~/Content/styleadvt.css",
                      "~/Content/iconstyle.css",
                      "~/Content/responsive.css",
                      "~/Content/font-awesome.min.css",
                      "~/Content/animate.css",
                      "~/App/directives/loading-spinner.css"                       
                      ));

            //bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
            //            "~/Scripts/jquery.unobtrusive*",
            //            "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/default").Include(
                "~/Scripts/jquery-{version}.js",
                "~/Scripts/bootstrap.js",
                "~/Scripts/owl.carousel.min.js",
                "~/Scripts/jquery.colorbox.js",
                "~/Scripts/isotope.js",
                "~/Scripts/ini.isotope.js",
                "~/Scripts/custom/custom.js",
                "~/Scripts/angular.js",
                "~/Scripts/angular-animate.js",
                "~/Scripts/angular-cookies.js",
                "~/Scripts/angular-ui-router.js",
                
                "~/Scripts/ng-file-upload-shim.js",
                "~/Scripts/ng-file-upload.js",

                "~/app/customer/uploader/directives/loading-spinner.js",
                

                "~/Scripts/angular-ui/ui-bootstrap.js",
                "~/Scripts/angular-ui/ui-bootstrap-tpls.js",
                "~/Scripts/main.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/common").Include(

                //app
                "~/app/app.js",
                "~/app/app.config.js",
                "~/app/app.constants.js",

                //app services
                "~/app/services/Base64.js",
                "~/app/services/auth-service.js",

                //app controllers
                "~/app/root-controller.js",

                //customer
                "~/app/customer/app.customer.js",
                "~/app/customer/app.customer.config.js",
                "~/app/customer/app.customer.constants.js",

                //customer services
                "~/app/customer/services/cart-service.js",
                "~/app/customer/services/cart-item-factory.js",
                "~/app/customer/services/store-service.js",
                "~/app/customer/services/prod-advt-service.js",

                //customer controllers
                "~/app/customer/login/login-controller.js",
                "~/app/customer/register/register-controller.js",
                "~/app/customer/logout/logout-controller.js",
                "~/app/customer/cart/cart-controller.js",
                "~/app/customer/cartdetail/cartdetail-controller.js",
                "~/app/customer/profile/profile-controller.js",
                "~/app/customer/profiledetail/profiledetail-controller.js",


                //vendor
                "~/app/vendor/app.vendor.js",
                "~/app/vendor/app.vendor.config.js",
                "~/app/vendor/app.vendor.constants.js",

                //vendor services
                "~/app/vendor/services/vendor-service.js",

                "~/app/vendor/services/advtfactory.js",

                //vendor controller
                //"~/app/vendor/root-controller.js",
                "~/app/vendor/advertisements/create-advt-controller.js",
                "~/app/vendor/purchaseorders/purchase-order-controller.js",
                "~/app/vendor/login/login-controller.js",
                "~/app/vendor/register/register-controller.js",
                "~/app/vendor/logout/logout-controller.js",
                "~/app/vendor/activeAdvts/advts-controller.js",
                "~/app/vendor/profile/profile-controller.js",
                "~/app/vendor/profiledetail/profiledetail-controller.js",
                "~/app/vendor/editadvt/editadvt-controller.js",


                "~/app/customer/image/controller.js",
                "~/app/customer/image/directive.js",
                "~/app/customer/image/services.js",



                "~/app/customer/uploader/home/home.js",
                "~/app/customer/uploader/services/fileService.js"


                ,
                "~/app/customer/pic/pic.js",
                "~/app/customer/orders/orders-controller.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/customer").Include(
                "~/app/customer/customer.js",
                "~/app/customer/customer.config.js",

                "~/app/customer/customer.constants.js",
                "~/app/customer/services/Base64.js",
                "~/app/customer/services/auth-service.js",
                "~/app/customer/services/cart-service.js",
                "~/app/customer/services/cart-item-factory.js",
                "~/app/customer/services/store-service.js",
                "~/app/customer/services/prod-advt-service.js",
                // controller
                "~/app/customer/root-controller.js",
                "~/app/customer/login/login-controller.js",
                "~/app/customer/register/register-controller.js",
                "~/app/customer/logout/logout-controller.js",
                "~/app/customer/cart/cart-controller.js",
                "~/app/customer/cartdetail/cartdetail-controller.js",
                "~/app/customer/profile/profile-controller.js",
                "~/app/customer/profiledetail/profiledetail-controller.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/vendor").Include(
                "~/app/vendor/vendor.js",
                "~/app/vendor/vendor.config.js",
                "~/app/vendor/vendor.constants.js",
                "~/app/vendor/services/vendor-auth-service.js",
                "~/app/vendor/root-controller.js"
                ));
        }
    }
}
