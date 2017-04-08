import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MuscleGroup } from "app/models/muscle-group";
import { DataServiceService } from "app/services/data-service.service";

@Component({
  selector: 'app-exercise-groups',
  templateUrl: './exercise-groups.component.html',
  styleUrls: ['./exercise-groups.component.css'],
  providers: [DataServiceService]
})
export class ExerciseGroupsComponent implements OnInit {

  groups : MuscleGroup[];

  constructor(private dataService : DataServiceService) { }

  loadMuscleGroupList(){
    this.dataService.getMuscleGroups().then(list => {
      this.groups = list;
    });
  }


  @Output()
  selectEvent = new EventEmitter<MuscleGroup>();

  select(selected : MuscleGroup){
    this.selectEvent.emit(selected);
  }

  ngOnInit() {
    this.loadMuscleGroupList();
  }

}
