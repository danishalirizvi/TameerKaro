

namespace TMKR.Models.DataModel
{
    public class CustomerModel
    {
        public int ID { get; set; }

        public string FRST_NME { get; set; }

        public string LAST_NME { get; set; }

        public string EMAIL { get; set; }

        public string PHNE { get; set; }

        public string USR_NME { get; set; }

        public string PSWD { get; set; }

        public string Address { get; set; }

        public string CITY { get; set; }

        public bool IsActive { get; set; }
    }
}