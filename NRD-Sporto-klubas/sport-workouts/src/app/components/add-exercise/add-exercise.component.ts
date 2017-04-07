import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Exercise } from "app/models/exercise";

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.css']
})
export class AddExerciseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input()
  exerciseDetails: Exercise;

  @Output()
  saveEvent = new EventEmitter<Exercise>();

  save(){
    if (!this.exerciseDetails.exerciseImageFirst){
      this.exerciseDetails.exerciseImageFirst =  "assets/images/noimg.png";
    }
    if (!this.exerciseDetails.exerciseImageSecond){
      this.exerciseDetails.exerciseImageSecond =  "assets/images/noimg.png";
    }
    this.saveEvent.emit(this.exerciseDetails);
  }

  cancel(){
    this.saveEvent.emit(null);
  }
  
}
