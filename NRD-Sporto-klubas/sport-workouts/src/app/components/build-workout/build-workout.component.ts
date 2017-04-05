import { Component, OnInit } from '@angular/core';
import {Exercise} from "app/models/exercise";
import {DataServiceService} from "app/services/data-service.service";
@Component({
  selector: 'app-build-workout',
  templateUrl: './build-workout.component.html',
  styleUrls: ['./build-workout.component.css'],
  providers: [DataServiceService]
})
export class BuildWorkoutComponent implements OnInit {

  exercises: Exercise[];

  constructor(private dataService: DataServiceService) { }

  loadExerciseList(){
    this.dataService.getExercises().then(arr => {
      this.exercises = arr;
    });
  }

  remove(exerciseIndex : any){
    if (exerciseIndex > -1) {
    this.exercises.splice(exerciseIndex, 1);
}
  }

  ngOnInit() {
    this.loadExerciseList();
  }

}
