using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TMKR.Models.DataModel
{
    public class ProfilePicModel
    {
        public int Id { get; set; }

        public string Path { get; set; }

        public string Type { get; set; }

        public string Action { get; set; }
    }
}