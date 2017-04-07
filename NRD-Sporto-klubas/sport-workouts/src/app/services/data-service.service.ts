import { Injectable } from '@angular/core';
import { Exercise } from "app/models/exercise";
import {MuscleGroup} from 'app/models/muscle-group';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataServiceService {
  delayTimeSec: number = 1000;

  constructor(private http: Http) { }

  //exercise service

   getExercises(): Promise<Exercise[]> {
    return this.http.get('http://localhost:49973/api/exer')
      .delay(this.delayTimeSec)
      .toPromise()
      .then(response => {
        console.log(response);
        return response.json() as Exercise[];
      });    
  }

  addExercise(exercises: Exercise): Promise<Exercise> {
    return this.http.post('/api/exercises', exercises)
      .toPromise()
      .then(response => {
        return response.json().data as Exercise;
      });    
  }  

  updateExercise(exercise: Exercise): Promise<void> {
    return this.http.put('/api/exercises/' + exercise.exerciseId, exercise)
      .toPromise()
      .then(() => null);
  }  

  removeExercise(exercise : Exercise): Promise<void> {
    return this.http.delete('/api/exercises/' + exercise.exerciseId)
     .toPromise()
     .then( () => null);
  }

  //----------------------------------------------------------------------
  // muscle group service

  getMuscleGroups(): Promise<MuscleGroup[]> {
    return this.http.get('http://localhost:49973/api/musclegroups')
      .toPromise()
      .then(response => {
        console.log(response);
        return response.json() as MuscleGroup[];
      });    
  }
  

}
