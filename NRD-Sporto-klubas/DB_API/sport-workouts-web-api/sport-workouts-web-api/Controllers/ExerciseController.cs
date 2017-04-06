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

        // updates exercise
        [Route("api/exercise/update")]
        public string PostUpdate(Exercise updatedExercixe)
        {
            using (var ctx = new WorkoutContext())
            {
                ctx.Configuration.ProxyCreationEnabled = false;
                Exercise exer = ctx.Exercises.SingleOrDefault(ss => ss.ExerciseId == updatedExercixe.ExerciseId);
                if (exer != null)
                {
                    exer.ExerciseImageFirst = updatedExercixe.ExerciseImageFirst;
                    exer.ExerciseImageSecond = updatedExercixe.ExerciseImageSecond;
                    exer.ExerciseName = updatedExercixe.ExerciseName;
                    ctx.SaveChanges();
                }         
            }

            return "success";
        }

        // deletes exercise
        [Route("api/exercise/delete/{id}")]
        public string GetDelete(int id)
        {
            using (var ctx = new WorkoutContext())
            {
                ctx.Configuration.ProxyCreationEnabled = false;
                Exercise exer = ctx.Exercises.SingleOrDefault(ss => ss.ExerciseId == id);
                ctx.Exercises.Remove(exer);
                ctx.SaveChanges();
            }

            return "success";
        }



        // get all exercises
        public List<Exercise> Get()
        {
            using (var ctx = new WorkoutContext())
            {
                ctx.Configuration.ProxyCreationEnabled = false;
                List<Exercise> exercises = new List<Exercise>();
                exercises = ctx.Exercises.ToList();
                return exercises;
            }
        }


        // get exercise
        public ExerciseModel Get(int id)
        {
            using (var ctx = new WorkoutContext())
            {
                //neveikia del virtual metodu, negali paverst tu lauku i json ar kazkas panasaus
                //pirmas budas
                ctx.Configuration.ProxyCreationEnabled = false;
                Exercise exer = ctx.Exercises.SingleOrDefault(ss => ss.ExerciseId == id);
                return exer;

                //antras budas
                //Exercise exer = ctx.Exercises.SingleOrDefault(ss => ss.ExerciseId == 1);
                //return new ExerciseModel { ExerciseName = exer.ExerciseName, ExerciseId = exer.ExerciseId };
            }
        }

    }
}
