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
  isEmpty : boolean = false; 

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

  add(index : any){
    this.addEvent.emit(this.exercises[index]);
    //salinti arba disablint mygtuka kad antra kart nepridetu? Vilius - Gal palikt kad galetu det kad ir kelis kart ta pati elementa (pavyzdziui nori mynt dvirati ir pradzioj treniruotes ir pabaigoj :D)
    //jeigu pasalina is build-workout reiks grazint atgal i exercise sarasa? Vilius - Jei paliekam, tada nebereiks ir grazint, tiesiog liks ten
    
    // Vilius - jei tinka ta logika, tuomet kaip suprantu uztenka tik situos uzkomentuot
    /*this.remove(index);   
    if (this.exercises.length <= 0){
      this.isEmpty = true;
    }*/
  }

  remove(exerciseIndex : any){
    if (exerciseIndex > -1) {
      this.exercises.splice(exerciseIndex, 1);
    }
  }
}
