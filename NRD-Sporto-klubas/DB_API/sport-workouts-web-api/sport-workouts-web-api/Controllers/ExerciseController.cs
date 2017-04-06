using sport_workouts_web_api.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace sport_workouts_web_api.Controllers
{
    public class ExerciseController : ApiController
    {

        // Post testavimo metodas. Priima per body paduodamus exercise parametrus
        public IHttpActionResult Post(Exercise st)
        {
            using (var ctx = new WorkoutContext())
            {
                Exercise pp = new Exercise();

                Workout ww = new Workout { WorkoutName = "Koju workoutas" };
                MuscleGroup gg = new MuscleGroup {MuscleGroupName = "Kojos"};


                try
                {

                    pp.ExerciseName = st.ExerciseName;
                    pp.ExerciseImageFirst = st.ExerciseImageFirst;
                    pp.ExerciseImageSecond = st.ExerciseImageSecond;
                    pp.MuscleGroups.Add(gg);
                    pp.Workouts.Add(ww);
                    ctx.Exercises.Add(pp);
                    ctx.SaveChanges();
                }
                catch (Exception Ex)
                {
                    var msg = Ex.Message;
                    return NotFound();
                }
                return Ok("Okay");
            }
        }

        /*
        public List<Exercise> Get()
        {
            using (var ctx = new WorkoutContext())
            {
                List<Exercise> exercises = new List<Exercise>();
                exercises = ctx.Exercises.ToList();
                return exercises;
            }
        }

        */

        // Neveikia, nezinau kaip gettint turimus duomenis
        public ExerciseModel Get()
        {
            using (var ctx = new WorkoutContext())
            {
                //neveikia del virtual metodu, negali paverst tu lauku i json ar kazkas panasaus
                //pirmas budas
                ctx.Configuration.ProxyCreationEnabled = false;
                Exercise exer = ctx.Exercises.SingleOrDefault(ss => ss.ExerciseId == 1);
                return exer;

                //antras budas
                //Exercise exer = ctx.Exercises.SingleOrDefault(ss => ss.ExerciseId == 1);
                //return new ExerciseModel { ExerciseName = exer.ExerciseName, ExerciseId = exer.ExerciseId };
            }
        }
    }
}
