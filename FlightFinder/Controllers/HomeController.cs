using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
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
            var textReader = new StreamReader(filename);
            var csv = new CsvReader(textReader);
            var records = csv.GetRecords<dynamic>();

            return records;
        }

    }

    internal class airports
    {
    }

    internal class flights
    {

    }
}