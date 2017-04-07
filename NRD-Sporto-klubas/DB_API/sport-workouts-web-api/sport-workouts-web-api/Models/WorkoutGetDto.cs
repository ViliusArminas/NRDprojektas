using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace sport_workouts_web_api.Models
{
    public class WorkoutGetDto
    {
        public int WorkoutId { get; set; }
        public string WorkoutName { get; set; }
    }
}