import { Component, OnInit, ViewChild } from '@angular/core';
import {Exercise} from "app/models/exercise";
import { DataServiceService } from "app/services/data-service.service";
import { MuscleGroup } from "app/models/muscle-group";
import {ExerciseComponent} from 'app/components/exercise/exercise.component';

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

  addExercise(item : Exercise){
    this.exercises.push(item);
  }

  selectMuscleGroup(selected : MuscleGroup){
    this.child.transferInfo(selected);
  }

  ngOnInit() {
    this.loadExerciseList();
  }

  @ViewChild(ExerciseComponent)
  private child: ExerciseComponent;

}
