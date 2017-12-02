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
        /// Changes the way the flights are sorted
        /// 0 descending in price, 1 ascending in price, 2 ascending Depart time
        /// </summary>
        /// <param name="by">Int sent from front end to point to which view is wanted</param>
        public ActionResult Sort(int by)
        {

            

            return Json(flights, JsonRequestBehavior.AllowGet);
        }
       

        

        /// <summary>
        /// Makes JSON object of flights IList
        /// </summary>
        /// <returns></returns>
        public ActionResult Flights()
        {
            
            string arr = Request["To"].Split(' ')[0];
            string dep = Request["From"].Split(' ')[0];
            
        
            if(arr != null && dep != null) { 

                var result = from f in flights
                             where f.From == dep
                             where f.To == arr
                             select f;
                /*result = from f in flights
                         where f.Arrives == arr
                         select f;*/

                flights = result.ToList();

                int by = Convert.ToInt16(Request["Sort"]);


                if (by == 0)
                {
                     result = from f in flights
                                 orderby f.FirstClassPrice ascending
                                 select f;
                    flights = result.ToList();
                }
                else if (by == 1)
                {
                     result = from f in flights
                                 orderby f.MainCabinPrice ascending
                                 select f;
                    flights = result.ToList();
                }
                else if (by == 2)
                {
                     result = from f in flights
                                 orderby Convert.ToDateTime(f.Departs) ascending
                                 select f;
                    flights = result.ToList();
                }
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