using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;

namespace TMKR.Models.DataModel
{
    public class ProdAdvertisementModel
    {
        public int ID { get; set; }
        
        public int? PROD_TYPE_ID { get; set; }
        
        public string DSCP { get; set; }

        public int? VNDR_ID { get; set; }
        
        public int? UNIT_PRICE { get; set; }
        
        public int? MAX_ORDR_LIMT { get; set; }
        
        public bool? DLVRY_AVLB { get; set; }

        public DateTime? POST_DATE { get; set; }
        
        public string STUS_NME { get; set; }

        public string Path { get; set; }
    }
}