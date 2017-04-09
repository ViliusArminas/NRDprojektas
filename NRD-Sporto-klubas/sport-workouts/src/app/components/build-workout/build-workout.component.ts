import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {Exercise} from "app/models/exercise";
import { DataServiceService } from "app/services/data-service.service";
import { MuscleGroup } from "app/models/muscle-group";
import { Workout } from "app/models/workout";
import { WorkoutDay} from "app/models/workout-day";
import {ExerciseComponent} from 'app/components/exercise/exercise.component';


@Component({
  selector: 'app-build-workout',
  templateUrl: './build-workout.component.html',
  styleUrls: ['./build-workout.component.css'],
  providers: [DataServiceService]
})
export class BuildWorkoutComponent implements OnInit {
 
  exercises: Exercise[] = [];
  muscleGroups : MuscleGroup[];
  workoutDays : WorkoutDay[] = [];

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
    this.workoutDays.length = 1;
    
    
  }

  @ViewChild(ExerciseComponent)
  private child: ExerciseComponent;

  addWorkoutDay() {
    this.workoutDays.length += 1;
  }

   removeWorkoutDay(i: number) {  
        this.workoutDays.splice(i,1);
    }

}
