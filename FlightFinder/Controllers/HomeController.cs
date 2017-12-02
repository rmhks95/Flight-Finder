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
        public HomeController()
        {
            airports = ReadFiles(@"airports.csv");
            flights = ReadFiles(@"flights.csv");
        }

        /// <summary>
        /// IList containing flights for front-end to retrieve
        /// </summary>
        private static IList<dynamic> flights;

        /// <summary>
        /// IList containing airports for front-end to retrieve
        /// </summary>
        private static IList<dynamic> airports;

        [OutputCache(Location = System.Web.UI.OutputCacheLocation.None)]

        /// <summary>
        /// Makes JSON object of flights IList
        /// </summary>
        /// <returns></returns>
        public ActionResult Flights()
        {

            try
            {
                string arr = Request["To"].Split(' ')[0];
                string dep = Request["From"].Split(' ')[0];
            
            
        
            if(arr != null && dep != null) { 

                var result = from f in flights
                             where f.From == dep.ToUpper()
                             where f.To == arr.ToUpper()
                             select f;

                flights = result.ToList();
                int by = 2;
                try { by = Convert.ToInt16(Request["Sort"]); }catch{ }
                


                if (by == 0)
                {
                    flights = flights.OrderBy(flights => Convert.ToInt16(flights.FirstClassPrice)).ToList();
                }
                else if (by == 1)
                {
                          
                    flights = flights.OrderBy(flights => Convert.ToInt16(flights.MainCabinPrice)).ToList();
                }
                else if (by == 2)
                {
                    flights = flights.OrderBy(flights => Convert.ToDateTime(flights.Departs)).ToList();
                }
            }
            }
            catch
            {

            }



            return Json(flights, JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Makes JSON object of airports IList
        /// </summary>
        /// <returns></returns>
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

        /// <summary>
        /// Reads csv files with CSVHelper
        /// </summary>
        /// <param name="filename">Name of file(including .csv)</param>
        /// <returns>IList of csv entries</returns>
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