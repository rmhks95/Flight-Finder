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
            
            var stream = Assembly.GetExecutingAssembly().GetManifestResourceStream("FlightFinder."+filename);
            var textReader = new StreamReader(stream);
            var csv = new CsvReader(textReader);
            var records = csv.GetRecords<airport>();

            return records;
        }

    }

    internal class airport
    {
        public String id { get; set; }
        public String name { get; set; }
    }

    internal class flights
    {
        public String from { get; set; }
        public String to { get; set; }
        public Int16 number { get; set; }
        public String depart { get; set; }
        public String arrive { get; set; }
        public Int16 mainPrice { get; set; }
        public Int16 firstPrice { get; set; }

    }
}