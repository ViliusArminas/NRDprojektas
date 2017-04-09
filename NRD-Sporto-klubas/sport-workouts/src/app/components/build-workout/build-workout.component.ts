import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
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
 
 // exercises: Exercise[] = [];
  muscleGroups : MuscleGroup[];
 // workoutDays : WorkoutDay[] = [];

  workout : Workout;
  
  urlParam : any = null;
isLoading: boolean = false;
  constructor(private dataService: DataServiceService, private router : Router, private activatedRoute: ActivatedRoute) { }

   loadMuscleGroupsList(){
    this.dataService.getMuscleGroups().then(arr => {
      this.muscleGroups = arr;
    });
  }

  remove(exerciseIndex : any){
    
    if (exerciseIndex > -1) {
    this.workout.exercises.splice(exerciseIndex, 1);
    }
  }

  addExercise(item : Exercise){
    this.workout.exercises.push(item);
  }

  selectMuscleGroup(selected : MuscleGroup){
    this.child.transferInfo(selected);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
        this.urlParam = params['id'];

        if (this.urlParam == "new"){    // jeigu kuriamas naujas workout
         // this.workoutDays.length = 1;
          this.workout = new Workout();
        }else{   
                  this.isLoading = true;               // jeigu redaguojamas esamas workout
            this.getWorkout(this.urlParam);
            this.isLoading = false;  
            
        }      
    }); 
    
  }

  getWorkout(id : number){
    this.dataService.getWorkout(id).then(w => {
      this.workout = w;
      console.log(this.workout);
      //this.exercises = this.workout.exercises;
      //this.muscleGroups = this.workout.muscleGroups;
      //this.workoutDays.length = 1;
    });
  }

  @ViewChild(ExerciseComponent)
  private child: ExerciseComponent;

  addWorkoutDay() {
   
   this.workout.workoutDays.push({
     workoutDayId: null,
     workoutDayMonthWeek: 0,
     workoutDayWeekDay: 0
   });
  }

   removeWorkoutDay(i: number) {  
        this.workout.workoutDays.splice(i,1);
    }

    save(){
     // this.workout.exercises = this.exercises;
     // this.workout.workoutDays = this.workoutDays;
      //this.workout.muscleGroups = this.muscleGroups;
      console.log(this.workout);
    }

}
