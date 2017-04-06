using sport_workouts_web_api.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace sport_workouts_web_api.Controllers
{


    public class MuscleGroupController : ApiController
    {
        [Route("api/muscle-group")]
        public IHttpActionResult Post(MuscleGroup mg)
        {
            using (var ctx = new WorkoutContext())
            {
                MuscleGroup newMuscleGroup = new MuscleGroup();
                try
                {
                    newMuscleGroup.MuscleGroupName = mg.MuscleGroupName;
                    ctx.MuscleGroups.Add(newMuscleGroup);
                    ctx.SaveChanges();
                }
                catch (Exception Ex)
                {
                    return NotFound();
                } 
            }
            return Ok("Item inserted.");
        }


        // Get all muscle groups, uses GET
        [Route("api/muscle-group")]
        public List<MuscleGroup> Get()
        {
            using (var ctx = new WorkoutContext())
            {
                ctx.Configuration.ProxyCreationEnabled = false;
                List<MuscleGroup> muscleGroups = new List<MuscleGroup>();
                muscleGroups = ctx.MuscleGroups.ToList();
                return muscleGroups;
            }
        }

        // Get muscle group, uses GET
        [Route("api/muscle-group/{id}")]
        public MuscleGroup Get(int id)
        {
            using (var ctx = new WorkoutContext())
            {
                ctx.Configuration.ProxyCreationEnabled = false;
                MuscleGroup group = ctx.MuscleGroups.SingleOrDefault(m => m.MuscleGroupId == id);
                return group;
            }
        }

        // Delete muscle group, uses GET
        [Route("api/muscle-group/delete/{id}")]
        public IHttpActionResult GetDelete(int id)
        {
            using (var ctx = new WorkoutContext())
            {
                ctx.Configuration.ProxyCreationEnabled = false;
                MuscleGroup group = ctx.MuscleGroups.SingleOrDefault((m => m.MuscleGroupId == id));
                ctx.MuscleGroups.Remove(group);
                ctx.SaveChanges();
            }

            return Ok("Deleted item.");
        }




    }

}
