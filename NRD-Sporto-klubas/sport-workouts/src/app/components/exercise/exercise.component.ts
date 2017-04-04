import { Component, OnInit, Output,  EventEmitter} from '@angular/core';
import { DataServiceService } from "app/services/data-service.service";
import { Exercise } from "app/models/exercise";

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css'],
  providers: [DataServiceService]
})
export class ExerciseComponent implements OnInit {
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

  @Output()
  addEvent = new EventEmitter<Exercise>(); 

  add(){
    //this.addEvent.emit(this.exercises);
  }
}
