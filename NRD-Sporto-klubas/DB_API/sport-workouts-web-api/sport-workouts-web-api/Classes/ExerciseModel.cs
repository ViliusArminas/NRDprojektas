using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace sport_workouts_web_api.Classes
{
    public class ExerciseModel
    {
        public int ExerciseId { get; set; }
        public string ExerciseName { get; set; }
        public string ExerciseImageFirst { get; set; }
        public string ExerciseImageSecond { get; set; }
    }

}