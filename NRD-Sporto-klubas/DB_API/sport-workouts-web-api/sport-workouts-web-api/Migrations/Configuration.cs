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

            if (!context.MuscleGroups.Any())
            {
                context.MuscleGroups.AddOrUpdate(
                new MuscleGroup { MuscleGroupName = "Rankø" },
                new MuscleGroup { MuscleGroupName = "Kojø" },
                new MuscleGroup { MuscleGroupName = "Nugaros" },
                new MuscleGroup { MuscleGroupName = "Pilvo" }
             );
            }

            if (!context.Exercises.Any())
            {
                 /*context.Workouts.Add(new Workout() {  WorkoutName = "Workautas1" });
                 context.Workouts.Add(new Workout() {  WorkoutName = "Workautas2" });
                 context.Workouts.Add(new Workout() {  WorkoutName = "Workautas3" });*/

                Exercise exer1 = new Exercise() {  ExerciseName = "Pritûpimai" };
                Exercise exer2 = new Exercise() {  ExerciseName = "Atsispaudimai" };
                Exercise exer3 = new Exercise() { ExerciseName = "Atsilenkimai" };
                Exercise exer4 = new Exercise() { ExerciseName = "Prisitraukimai" };

                Workout work1 = new Workout() {   WorkoutName = "Workout1" };
                Workout work2 = new Workout() { WorkoutName = "Workout2" };

                exer1.Workouts.Add(work1);
                exer2.Workouts.Add(work1);

                work1.Exercises.Add(exer1);
                work1.Exercises.Add(exer2);
                context.Workouts.Add(work1);


                exer3.Workouts.Add(work2);
                exer4.Workouts.Add(work2);

                work2.Exercises.Add(exer3);
                work2.Exercises.Add(exer4);
                context.Workouts.Add(work2);

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
