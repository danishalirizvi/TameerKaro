using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TMKR.Models.DataModel
{
    public class CustomerProfileModel
    {
        public int ID { get; set; }

        public string FRST_NME { get; set; }

        public string LAST_NME { get; set; }

        public string EMAIL { get; set; }

        public long PHNE { get; set; }

        public string USR_NME { get; set; }

        public string PSWD { get; set; }

        public string Address { get; set; }

        public string CITY { get; set; }

        public string CRNT_PSWD { get; set; }
    }
}