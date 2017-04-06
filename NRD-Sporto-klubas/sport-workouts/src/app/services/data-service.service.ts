import { Injectable } from '@angular/core';
import { Exercise } from "app/models/exercise";
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataServiceService {
  delayTimeSec: number = 1000;

  constructor(private http: Http) { }

   getExercises(): Promise<Exercise[]> {
    return this.http.get('/api/exercises')
      .delay(this.delayTimeSec)
      .toPromise()
      .then(response => {
        return response.json().data as Exercise[];
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
    return this.http.put('/api/exercises/' + exercise.id, exercise)
      .toPromise()
      .then(() => null);
  }  

  removeExercise(exercise : Exercise): Promise<void> {
    return this.http.delete('/api/exercises/' + exercise.id)
     .toPromise()
     .then( () => null);
  }

}
