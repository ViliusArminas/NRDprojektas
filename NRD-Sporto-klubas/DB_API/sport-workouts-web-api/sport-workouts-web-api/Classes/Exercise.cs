using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace sport_workouts_web_api.Classes
{
    public class Exercise : ExerciseModel
    {
        public Exercise()
        {
            this.Workouts = new HashSet<Workout>();
            this.MuscleGroups = new HashSet<MuscleGroup>();
        }

        public virtual ICollection<Workout> Workouts { get; set; }
        public virtual ICollection<MuscleGroup> MuscleGroups { get; set; }
    }



}