using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TMKR.Models.DataModel
{
    public class PurchaseOrderTypesModel
    {
        public List<PurchaseOrderParentModel> New { get; set; }

        public List<PurchaseOrderParentModel> Accepted { get; set; }

        public List<PurchaseOrderParentModel> Rejected { get; set; }

    }
}