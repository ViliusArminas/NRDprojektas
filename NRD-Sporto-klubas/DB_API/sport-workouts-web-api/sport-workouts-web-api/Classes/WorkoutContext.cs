using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace sport_workouts_web_api.Classes
{
    class WorkoutContext : DbContext
    {
        public WorkoutContext() : base("WorkoutsDB")
        {
        }

        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<Workout> Workouts { get; set; }
        public DbSet<WorkoutDay> WorkoutDays { get; set; }
        public DbSet<MuscleGroup> MuscleGroups { get; set; }
    }
}