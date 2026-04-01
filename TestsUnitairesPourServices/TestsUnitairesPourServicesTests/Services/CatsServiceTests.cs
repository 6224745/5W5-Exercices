using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using TestsUnitairesPourServices.Data;
using TestsUnitairesPourServices.Exceptions;
using TestsUnitairesPourServices.Models;
using TestsUnitairesPourServices.Services;

namespace TestsUnitairesPourServices.Services.Tests
{
    [TestClass()]
    public class CatsServiceTests
    {
        private DbContextOptions<ApplicationDBContext> _options;
        public CatsServiceTests()
        {
            // TODO On initialise les options de la BD, on utilise une InMemoryDatabase
            _options = new DbContextOptionsBuilder<ApplicationDBContext>()
                // TODO il faut installer la dépendance Microsoft.EntityFrameworkCore.InMemory
                .UseInMemoryDatabase(databaseName: "CatsService")
                .UseLazyLoadingProxies(true) // Active le lazy loading
                .Options;
        }

        [TestInitialize]
        public void Init()
        {
            // TODO avoir la durée de vie d'un context la plus petite possible
            using ApplicationDBContext db = new ApplicationDBContext(_options);

            House house1 = new House() { Id = 1, Address = "945 Ch. de Chambly", OwnerName = "Bob", Cats = [] };
            House house2 = new House() { Id = 2, Address = "850 Ch. de Chambly", OwnerName = "Max", Cats = [] };

            Cat cat1 = new Cat() { Id = 1, Name = "Chat Dragon", Age = 200, House = house1 };
            Cat cat2 = new Cat() { Id = 2, Name = "Chat Awesome", Age = 50, House = null };

            db.AddRange(house1, house2, cat1, cat2);
            db.SaveChanges();
        }

        [TestCleanup]
        public void Dispose()
        {
            //TODO on efface les données de tests pour remettre la BD dans son état initial
            using ApplicationDBContext db = new ApplicationDBContext(_options);
            db.Cat.RemoveRange(db.Cat);
            db.House.RemoveRange(db.House);
            db.SaveChanges();
        }

        [TestMethod()]
        public void MoveTestSucces()
        {
            using ApplicationDBContext db = new ApplicationDBContext(_options);
            CatsService service = new CatsService(db);
            House h1 = db.House.Find(1);
            House h2 = db.House.Find(2);

            if (service.Move(1, h1, h2) == null)
            {
                Assert.Fail();
            }
        }

        [TestMethod()]
        public void MoveTestBadId()
        {
            using ApplicationDBContext db = new ApplicationDBContext(_options);
            CatsService service = new CatsService(db);
            House h1 = db.House.Find(1);
            House h2 = db.House.Find(2);

            if (service.Move(6, h1, h2) != null)
            {
                Assert.Fail();
            }
        }

        [TestMethod()]
        public void MoveTestNoHouse()
        {
            using ApplicationDBContext db = new ApplicationDBContext(_options);
            CatsService service = new CatsService(db);
            House h1 = db.House.Find(1);
            House h2 = db.House.Find(2);

            Exception e = Assert.ThrowsException<WildCatException>(() => service.Move(2, h1, h2));
            Assert.AreEqual("On n'apprivoise pas les chats sauvages", e.Message);
        }

        [TestMethod()]
        public void MoveTestDontSteal()
        {
            using ApplicationDBContext db = new ApplicationDBContext(_options);
            CatsService service = new CatsService(db);
            House h1 = db.House.Find(1);
            House h2 = db.House.Find(2);

            Exception e = Assert.ThrowsException<DontStealMyCatException>(() => service.Move(1, h2, h1));
            Assert.AreEqual("Touche pas à mon chat!", e.Message);
        }
    }
}