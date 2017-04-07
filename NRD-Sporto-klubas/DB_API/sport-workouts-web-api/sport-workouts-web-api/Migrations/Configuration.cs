namespace sport_workouts_web_api.Migrations
{
    using Classes;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<sport_workouts_web_api.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(sport_workouts_web_api.Models.ApplicationDbContext context)
        {

            if(!context.Workouts.Any())
            {
                context.Workouts.Add(new Workout() { WorkoutName = "pavadinimas" });
                context.Workouts.Add(new Workout() { WorkoutName = "pavadinimas2" });
                context.Workouts.Add(new Workout() { WorkoutName = "pavadinimas3" });

                //context.SaveChanges();
                //base.Seed(context);
                
            }
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
        }
    }
}
