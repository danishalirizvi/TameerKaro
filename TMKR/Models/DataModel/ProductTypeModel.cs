using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TMKR.Models.DataModel
{
    public class ProductTypeModel
    {
        public int ID { get; set; }

        public string NME { get; set; }

        public string DSCP { get; set; }

        public int EXT_CODE { get; set; }
    }
}