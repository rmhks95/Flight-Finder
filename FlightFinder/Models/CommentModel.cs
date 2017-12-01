using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FlightFinder.Models
{
    public class Flight
    {
        public string From { get; set;}
        public string To { get; set; }
        public string Text { get; set; }
        public string FlightNumber { get; set; }
        public string Departs { get; set; }
        public string Arrives { get; set; }
        public int MainCabinPrice { get; set; }
        public int FirstClassPrice { get; set; }
        

    }
}