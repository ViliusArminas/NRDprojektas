using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using sport_workouts_web_api.Classes;
using sport_workouts_web_api.Models;
using System.Web.Http.Cors;

namespace sport_workouts_web_api.Controllers
{
    [EnableCorsAttribute("http://localhost:4200","*","*")]
    public class WorkoutsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Workouts
        public List<WorkoutGetDto> GetWorkouts()
        {
            var list= db.Workouts.ToList();

            var resList = new List<WorkoutGetDto>();

            /* foreach (var i in list)
             {
                 resList.Add(new WorkoutGetDto()
                 {
                 WorkoutId = i.WorkoutId,
                 WorkoutName = i.WorkoutName
                 });
             }*/

            var result =  AutoMapper.Mapper.Map<List<WorkoutGetDto>>(list);
            return result;
        }

        // GET: api/Workouts/5
        //[ResponseType(typeof(Workout))]
        //[EnableCorsAttribute("http://localhost:4200", "*", "*")]
        public WorkoutGetDto GetWorkout(int id)
        {
            Workout workout = db.Workouts.Find(id);
            if (workout == null)
            {
                return null;
            }

            WorkoutGetDto result = AutoMapper.Mapper.Map<WorkoutGetDto>(workout);
            return result;
        }

        // PUT: api/Workouts/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutWorkout(int id, Workout workout)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != workout.WorkoutId)
            {
                return BadRequest();
            }

            db.Entry(workout).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WorkoutExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Workouts
        //[ResponseType(typeof(Workout))]
        [EnableCorsAttribute("http://localhost:4200", "*", "*")]
        public IHttpActionResult PostWorkout(WorkoutPostDto workout)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            

            var insertItem = AutoMapper.Mapper.Map<Workout>(workout);

            // muscleGroups entities assigned to workout by ids from dto information
            var muscleGroups = db.MuscleGroups.ToList();
            var workoutMuscleGroups = new List<MuscleGroup>();
            foreach (var i in workout.MuscleGroups)
            {
                workoutMuscleGroups.Add(muscleGroups.Single(a => a.MuscleGroupId == i.MuscleGroupId));
            }
            insertItem.MuscleGroups = workoutMuscleGroups;
            // ---------------------------

            // exercises entities assigned to workout by ids from dto information
            var exercises = db.Exercises.ToList();
            var workoutExercises = new List<Exercise>();
            foreach (var i in workout.Exercises)
            {
                workoutExercises.Add(exercises.Single(a => a.ExerciseId == i.ExerciseId));
            }
            insertItem.Exercises = workoutExercises;
            // ---------------------------

            // workoutDays entities created to workout from dto information
            var workoutWorkoutDays = new List<WorkoutDay>();
            foreach (var i in workout.WorkoutDays)
            {
                var workoutDays = new WorkoutDay();
                workoutDays.WorkoutDayMonthWeek = i.WorkoutDayMonthWeek;
                workoutDays.WorkoutDayWeekDay = i.WorkoutDayWeekDay;
                workoutWorkoutDays.Add(workoutDays);
            }
            insertItem.WorkoutDays = workoutWorkoutDays;
            // ---------------------------

            // Inserting new workout with all information
            db.Workouts.Add(insertItem);
            db.SaveChanges();

            var workoutDto = AutoMapper.Mapper.Map<WorkoutGetDto>(insertItem);

            return CreatedAtRoute("DefaultApi", new { id = workoutDto.WorkoutId }, workoutDto);
        }

        // DELETE: api/Workouts/5
        [ResponseType(typeof(Workout))]
        public IHttpActionResult DeleteWorkout(int id)
        {
            Workout workout = db.Workouts.Find(id);
            if (workout == null)
            {
                return NotFound();
            }

            db.Workouts.Remove(workout);
            db.SaveChanges();

            return Ok(workout);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool WorkoutExists(int id)
        {
            return db.Workouts.Count(e => e.WorkoutId == id) > 0;
        }
    }
}