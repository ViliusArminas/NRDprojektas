import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Router} from "@angular/router";
import { DataServiceService } from "app/services/data-service.service";
import { Workout } from "app/models/workout";
import { MuscleGroup } from "app/models/muscle-group";

@Component({
  selector: 'app-my-workouts',
  templateUrl: './my-workouts.component.html',
  styleUrls: ['./my-workouts.component.css'],
  providers: [DataServiceService]
})
export class MyWorkoutsComponent implements OnInit {
  workouts: Workout[];

  isLoading: boolean = false;
  isEmpty: boolean = false;
  constructor(private dataService: DataServiceService, private router: Router) { }

  edit(workout : Workout){
    console.log(workout);
    this.router.navigate(['/build-workout/' + workout.workoutId]);
  }

  ngOnInit() {
    this.refreshList();
  }

  refreshList() {
    this.isLoading = true;
    this.dataService.getWorkouts().then(c => {
      this.workouts = c;
      this.isLoading = false;
    });
  }
}
