using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TMKR.Models.DataModel
{
    public class OrderTypesModel
    {
        public List<OrderParentModel> Pending { get; set; }

        public List<OrderParentModel> Accepted { get; set; }

        public List<OrderParentModel> Rejected { get; set; }
    }
}