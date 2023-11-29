using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helper
{
    public class ProductRequestParams
    {
        public int? brandId { get; set; }
        public int? typeId { get; set; }
        public string sort { get; set; }

        private string _Search;
        public string Search
        {
            get => _Search;
            set => _Search = value.ToLower();
        }
    }
}