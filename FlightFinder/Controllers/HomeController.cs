using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Reflection;
using System.IO;
using System.Web.Mvc;
using CsvHelper;
using FlightFinder.Models;

namespace FlightFinder.Controllers
{
    public class HomeController : Controller
    {
        private static IList<dynamic> flights;
        private static IList<dynamic> airports;

       

        [OutputCache(Location = System.Web.UI.OutputCacheLocation.None)]
        public ActionResult Flights()
        {
            
            return Json(flights, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Airports()
        {
            return Json(airports, JsonRequestBehavior.AllowGet);
        }

        // GET: Home
        public ActionResult Index()
        {
            airports = ReadFiles(@"airports.csv");
            flights = ReadFiles(@"flights.csv");
            return View();
        }

        public IList<dynamic> ReadFiles(string filename)
        {
            List<dynamic> info = new List<dynamic>();
            
            var stream = Assembly.GetExecutingAssembly().GetManifestResourceStream("FlightFinder."+filename);
            var textReader = new StreamReader(stream);
            var csv = new CsvReader(textReader);
            while (csv.Read())
            {
                var records = csv.GetRecord<dynamic>();
                info.Add(records);
            }


            return info;
        }

    }

}