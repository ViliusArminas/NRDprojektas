import { Component, OnInit, ViewChild } from '@angular/core';
import {Exercise} from "app/models/exercise";
import { DataServiceService } from "app/services/data-service.service";
import { MuscleGroup } from "app/models/muscle-group";
import { Workout } from "app/models/workout";
import {ExerciseComponent} from 'app/components/exercise/exercise.component';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-build-workout',
  templateUrl: './build-workout.component.html',
  styleUrls: ['./build-workout.component.css'],
  providers: [DataServiceService]
})
export class BuildWorkoutComponent implements OnInit {
  public buildWorkoutForm: FormGroup;
  exercises: Exercise[] = [];
  muscleGroups : MuscleGroup[];
  buildWorkout : Workout[];

  constructor(private dataService: DataServiceService) { }

  loadExerciseList(){
  }

   loadMuscleGroupsList(){
    this.dataService.getMuscleGroups().then(arr => {
      this.muscleGroups = arr;
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

  }

  @ViewChild(ExerciseComponent)
  private child: ExerciseComponent;

  // build workout stuff
  save(model: Workout) {
        // call API to save
        // ...
        console.log(model);
    }
}
