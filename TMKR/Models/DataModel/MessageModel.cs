using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TMKR.Models.DataModel
{
    public class MessageModel
    {
        public int ID { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Message { get; set; }

        public bool IsActive { get; set; }
    }
}