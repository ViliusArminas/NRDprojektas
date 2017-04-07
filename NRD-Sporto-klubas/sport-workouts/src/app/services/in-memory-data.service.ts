import { Injectable } from '@angular/core';
import { Exercise } from "app/models/exercise";
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class InMemoryDataService extends InMemoryDbService{
createDb(){
    return {
      exercises: cArrayExercises
    };
  }
}
  const cArrayExercises: Exercise[] =[
      {
        exerciseId: 1,
        exerciseName: 'Štangos stūmimas',
        exerciseImageFirst: 'assets/images/noimg.png',
        exerciseImageSecond: 'assets/images/noimg.png'
      },
      {
        exerciseId: 2,
        exerciseName: 'Pritupimai',
        exerciseImageFirst: 'assets/images/noimg.png',
        exerciseImageSecond: 'assets/images/noimg.png'
      }
    ];

    const mockArrayExercises: Exercise[] =[
      {
        exerciseId: 1,
        exerciseName: 'Prisitraukimai',
        exerciseImageFirst: 'assets/images/noimg.png',
        exerciseImageSecond: 'assets/images/noimg.png'
      },
      {
        exerciseId: 2,
        exerciseName: 'Pritupimai',
        exerciseImageFirst: 'assets/images/noimg.png',
        exerciseImageSecond: 'assets/images/noimg.png'
      }
      ,
      {
        exerciseId: 3,
        exerciseName: 'Atsispaudimai',
        exerciseImageFirst: 'assets/images/noimg.png',
        exerciseImageSecond: 'assets/images/noimg.png'
      }
    ];

