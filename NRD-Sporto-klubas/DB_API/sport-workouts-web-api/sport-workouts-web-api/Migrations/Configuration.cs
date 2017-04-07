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

            if (1 != 0)
           {
                /* context.Workouts.Add(new Workout() { WorkoutId = 1, WorkoutName = "Workautas1" });
                 context.Workouts.Add(new Workout() { WorkoutId = 2, WorkoutName = "Workautas2" });
                 context.Workouts.Add(new Workout() { WorkoutId = 2, WorkoutName = "Workautas3" });*/
                Exercise exer1 = new Exercise() { ExerciseId = 4, ExerciseName = "Exersicas4" };
                Exercise exer2 = new Exercise() { ExerciseId = 5, ExerciseName = "Exersicas5" };
                Workout work3 = new Workout() { WorkoutId = 3, WorkoutName = "Workautas3" };

                exer1.Workouts.Add(work3);
                exer2.Workouts.Add(work3);

                work3.Exercises.Add(exer1);
                work3.Exercises.Add(exer2);
                context.Workouts.Add(work3);
            }
              /*  if (!context.Exercises.Any())
                {

                context.Exercises.Add(new Exercise() { ExerciseId = 1, ExerciseName = "Exersicas1" });
                context.Exercises.Add(new Exercise() { ExerciseId = 1, ExerciseName = "Exersicas1" });
                context.Exercises.Add(new Exercise() { ExerciseId = 1, ExerciseName = "Exersicas1" });



            }*/
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
