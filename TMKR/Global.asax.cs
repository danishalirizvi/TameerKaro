
using System;
using System.Web;
using System.Web.Http;
using System.Web.Optimization;

namespace TMKR
{
    public class MvcApplication : HttpApplication
    {
        void Application_Start(object sender, EventArgs e)
        {
            // Code that runs on application startup
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }
    }
}