import { Component, OnInit } from '@angular/core';
import { Exercise } from "app/models/exercise";
import { DataServiceService } from "app/services/data-service.service";

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

  constructor(private dataService: DataServiceService) { }

  ngOnInit() {
     this.refreshList();
  }

  refreshList(){
    this.isLoading = true;
    this.dataService.getExercises().then(c => {
      this.exercises = c;
      this.isLoading = false;
    });
  }

   saveExercise(newExercise: Exercise){
    if(newExercise == null) return;

    //update exercise in DB
    if (this.editingExercise){
      this.dataService.updateExercise(newExercise);
    }//add new  exercise to DB
    else{ 
      this.dataService.addExercise(newExercise);
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

}
