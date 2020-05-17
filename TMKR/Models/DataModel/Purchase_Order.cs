using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TMKR.Models.DataModel
{
    public class Purchase_Order
    {
        public List<PurchaseOrderParentModel> parent { get; set; }

        public List<PurchaseOrderChildModel> child { get; set; }
    }
}