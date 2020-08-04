using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using TMKR.Controllers.WebApi;

namespace TMKR
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API routes
            //config.MapHttpAttributeRoutes();

            CustomerController.ConfigureRoutes(config);
            VendorController.ConfigureRoutes(config);
            FilesController.ConfigureRoutes(config);
            AdminController.ConfigureRoutes(config);

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
