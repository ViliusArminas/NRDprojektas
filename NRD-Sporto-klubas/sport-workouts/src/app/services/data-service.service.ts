import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Exercise } from "app/models/exercise";
import { Workout } from "app/models/workout";
import {MuscleGroup} from 'app/models/muscle-group';

@Injectable()
export class DataServiceService {
  delayTimeSec: number = 1000;

  constructor(private http: Http) { }

  //exercise service

   getExercises(): Promise<Exercise[]> {
    return this.http.get('http://localhost:49974/api/exer')
      .delay(this.delayTimeSec)
      .toPromise()
      .then(response => {
        return response.json() as Exercise[];
      });    
  }

  addExercise(exercises: Exercise): Promise<Exercise> {
    return this.http.post('http://localhost:49974/api/exer', exercises)
      .toPromise()
      .then(response => { 
       return response.json().data as Exercise;}, 
       err => {
          console.log(err);
          return null;
        });  
       
  }  

  updateExercise(exercise: Exercise): Promise<Exercise> {
    return this.http.put('http://localhost:49974/api/exercises/' + exercise.exerciseId, exercise)
      .toPromise()
     .then(
        response => {
          console.log(response.json() as Exercise);
          return response.json() as Exercise;
        },
        err => {
          console.log(err);
          return null;
        });    
  }  

  removeExercise(exercise : Exercise): Promise<void> {
    return this.http.delete('http://localhost:49974/api/exer/delete/' + exercise.exerciseId)
     .toPromise()
     .then( () => null);
  }

  getExercisesByMuscleGroup(groupId : number): Promise<Exercise[]> {
    return this.http.get('http://localhost:49974/api/exer/' + groupId)
      .toPromise()
      .then(response => {
        return response.json() as Exercise[];
      });    
  }

  //----------------------------------------------------------------------
  // muscle group service

  getMuscleGroups(): Promise<MuscleGroup[]> {
    return this.http.get('http://localhost:49974/api/musclegroups')
      .toPromise()
      .then(response => {
        //console.log(response);
        return response.json() as MuscleGroup[];
      });    
  }
  
  // workouts service

getWorkouts(): Promise<Workout[]> {
    return this.http.get('http://localhost:49974/api/workouts')
      .toPromise()
      .then(response => {
        //console.log(response);
        return response.json() as Workout[];
      });    
}

getWorkout(id : number): Promise<Workout> {
    return this.http.get('http://localhost:49974/api/workouts/' + id)
      .toPromise()
      .then(response => {
        return response.json() as Workout;
      });    
}

 addWorkout(workout: Workout): Promise<Workout> {
    return this.http.post('http://localhost:49974/api/workouts', workout)
      .toPromise()
      .then(response => {
       console.log(response);
        return response.json().data as Workout;
      });    
  }  

updateWorkout(workout: Workout): Promise<Workout> {
    return this.http.put('http://localhost:49974/api/workouts/update/' + workout.workoutId, workout)
      .toPromise()
      .then(response => {
       console.log(response);
        return response.json().data as Workout;
      });    
  }  

   removeWorkout(workout : Workout): Promise<void> {
    return this.http.delete('/api/workouts/' + workout.workoutId)
     .toPromise()
     .then( () => null);
  }


}
