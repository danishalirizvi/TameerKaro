using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TKDR.Web.Helpers
{
    // https://code.msdn.microsoft.com/How-to-create-and-access-447ada98
    public static class SessionExtensions
    {
        /// <summary>
        /// Get value.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="session"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        public static T GetDataFromSession<T>(this HttpSessionStateBase session, string key)
        {
            return (T)session[key];
        }

        /// <summary>
        /// Set value.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="session"></param>
        /// <param name="key"></param>
        /// <param name="value"></param>
        public static void SetDataToSession<T>(this HttpSessionStateBase session, string key, object value)
        {
            session[key] = value;
        }


        // string value = Session.GetDataFromSession<string>("key1");
        // Session.SetDataToSession<string>("key1", sessionValue);
    }
}