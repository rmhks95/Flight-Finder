using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Reflection;
using System.IO;
using System.Web.Mvc;
using CsvHelper;

namespace FlightFinder.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            var airports = ReadFiles(@"airports.csv");
            var flights = ReadFiles(@"flights.csv");
            return View();
        }

        public IEnumerable<dynamic> ReadFiles(string filename)
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