import { Component, OnInit, ViewChild } from '@angular/core';
import { Exercise } from "app/models/exercise";
import { DataServiceService } from "app/services/data-service.service";
import { MuscleGroup } from "app/models/muscle-group";

@Component({
  selector: 'app-view-exercise',
  templateUrl: './view-exercise.component.html',
  styleUrls: ['./view-exercise.component.css'],
  providers: [DataServiceService]
})
export class ViewExerciseComponent implements OnInit {
exercise: Exercise;
exercises: Exercise[];
isLoading: boolean = false;
editingExercise : boolean = false;

selectedMuscleGroup : MuscleGroup = null;

  constructor(private dataService: DataServiceService) { }

  ngOnInit() {
     this.loadList();
  }

  loadList(){
    this.isLoading = true;
    this.dataService.getMuscleGroups().then(c => {
       this.selectedMuscleGroup = c[0];
       this.loadExercises(this.selectedMuscleGroup.muscleGroupId);
    });
  }

  loadExercises(id : number){
    this.dataService.getExercisesByMuscleGroup(id).then(c => {
          this.exercises = c;
          this.isLoading = false;
    })
  }

  refreshList(){
      this.isLoading = true;
      this.loadExercises(this.selectedMuscleGroup.muscleGroupId);
    }


   saveExercise(newExercise: Exercise){
    if(newExercise == null) return;

    //update exercise in DB
    if (this.editingExercise){
      console.log(newExercise);
      this.dataService.updateExercise(newExercise);
    }//add new  exercise to DB
    else{ 
      this.dataService.addExercise(newExercise);
      console.log(newExercise);
    }

    this.editingExercise = false;
    this.exercise = null;
    this.refreshList();
  }

  editExercise(selected : Exercise){
    this.editingExercise = true;
    this.exercise = selected;
  }

  deleteExercise(selected : Exercise){
    this.dataService.removeExercise(selected);
    this.refreshList();
  }

  addNewExercise(){
    this.exercise = new Exercise();
  }

  selectMuscleGroup(selected : MuscleGroup){
    this.selectedMuscleGroup = selected;
    this.refreshList();
  }


}
