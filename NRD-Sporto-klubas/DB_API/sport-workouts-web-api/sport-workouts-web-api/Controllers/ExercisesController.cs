﻿using System;
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
     [EnableCorsAttribute("http://localhost:4200", "*", "*")]
   
    public class ExercisesController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Exercises
        [Route("api/exer")]
        public List<ExercisesGetDto> GetExercises()
        {
            var list = db.Exercises.ToList();

            var resList = new List<ExercisesGetDto>();
            var result = AutoMapper.Mapper.Map<List<ExercisesGetDto>>(list);
            return result;
        }

        [Route("api/exer/{groupId}")]
        public List<ExercisesGetDto> GetExercisesByMuscleGroup(int groupId)
        {
            var list = db.Exercises.ToList();

            var resList = new List<ExercisesGetDto>();
            var result = AutoMapper.Mapper.Map<List<ExercisesGetDto>>(list);

            var filteredList = new List<ExercisesGetDto>();

            foreach (var i in result)
            {
                ICollection<MuscleGroupsGetDto> lst = i.MuscleGroups;
                foreach (var j in lst)
                {
                    if (j.MuscleGroupId == groupId)
                        filteredList.Add(i);
                }
            }

            return filteredList;
        }

        // GET: api/Exercises/5
        [ResponseType(typeof(Exercise))]
        public IHttpActionResult GetExercise(int id)
        {
            Exercise exercise = db.Exercises.Find(id);
            if (exercise == null)
            {
                return NotFound();
            }

            return Ok(exercise);
        }

        // PUT: api/Exercises/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutExercise(int id, Exercise exercise)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != exercise.ExerciseId)
            {
                return BadRequest();
            }

            db.Entry(exercise).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExerciseExists(id))
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

        // POST: api/Exercises
        [ResponseType(typeof(Exercise))]
        public IHttpActionResult PostExercise(Exercise exercise)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Exercises.Add(exercise);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = exercise.ExerciseId }, exercise);
        }

        // DELETE: api/Exercises/5
        [ResponseType(typeof(Exercise))]
        public IHttpActionResult DeleteExercise(int id)
        {
            Exercise exercise = db.Exercises.Find(id);
            if (exercise == null)
            {
                return NotFound();
            }

            db.Exercises.Remove(exercise);
            db.SaveChanges();

            return Ok(exercise);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ExerciseExists(int id)
        {
            return db.Exercises.Count(e => e.ExerciseId == id) > 0;
        }
    }
}