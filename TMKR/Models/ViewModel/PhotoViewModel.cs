using System;

namespace TMKR.Models.ViewModel
{
    internal class PhotoViewModel
    {
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
        public string Name { get; set; }
        public long Size { get; set; }
        public string Path { get; set; }
    }
}