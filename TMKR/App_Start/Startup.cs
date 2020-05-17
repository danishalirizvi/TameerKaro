using Microsoft.Owin;
using Owin;
using System.Web.Routing;
using System.Web.Optimization;
using System.Web.Http;
using Microsoft.Owin.Cors;

[assembly: OwinStartup(typeof(TMKR.Startup))]

namespace TMKR
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=316888
 
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            // Web API
            HttpConfiguration config = new HttpConfiguration();
            // Handles registration of the Web API's routes
            WebApiConfig.Register(config);
            // Enables us to call the Web API from domains other than the ones the API responds to
            app.UseCors(CorsOptions.AllowAll);
         }
    }
}
