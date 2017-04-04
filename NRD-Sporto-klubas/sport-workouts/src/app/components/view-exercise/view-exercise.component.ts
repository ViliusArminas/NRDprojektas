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

   saveExercise(exercise: Exercise){
    this.exercise = null;

    if(exercise == null) return;
    this.dataService.addExercise(exercise);
    
    this.refreshList();
  }

  addNewExercise(){
    this.exercise = new Exercise();
  }

}
