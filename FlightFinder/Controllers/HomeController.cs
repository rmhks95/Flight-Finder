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
        private static readonly IList<CommentModel> _comments;

        static HomeController()
        {
            _comments = new List<CommentModel>
            {
                new CommentModel
                {
                    Id = 1,
                    Author = "Daniel Lo Nigro",
                    Text = "Hello ReactJS.NET World!"
                },
                new CommentModel
                {
                    Id = 2,
                    Author = "Pete Hunt",
                    Text = "This is one comment"
                },
                new CommentModel
                {
                    Id = 3,
                    Author = "Jordan Walke",
                    Text = "This is *another* comment"
                },
            };
        }

        [OutputCache(Location = System.Web.UI.OutputCacheLocation.None)]
        public ActionResult Comments()
        {
            return Json(_comments, JsonRequestBehavior.AllowGet);
        }

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