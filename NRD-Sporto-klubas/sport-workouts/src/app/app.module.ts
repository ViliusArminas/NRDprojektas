import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routes } from './app.router';
import { AlertModule } from 'ng2-bootstrap';
import { CalendarModule } from 'angular-calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { BuildWorkoutComponent } from './components/build-workout/build-workout.component';
import { MyWorkoutsComponent } from './components/my-workouts/my-workouts.component';
import { AddExerciseComponent } from './components/add-exercise/add-exercise.component';
import { ViewExerciseComponent } from './components/view-exercise/view-exercise.component';
import { WorkoutCalendarComponent } from './components/workout-calendar/workout-calendar.component';
import { ExerciseComponent } from './components/exercise/exercise.component';
import { InMemoryDataService } from "app/services/in-memory-data.service";
import { ExerciseGroupsComponent } from './components/exercise-groups/exercise-groups.component';



@NgModule({
  declarations: [
    AppComponent,
    BuildWorkoutComponent,
    MyWorkoutsComponent,
    AddExerciseComponent,
    ViewExerciseComponent,
    WorkoutCalendarComponent,
    ExerciseComponent,
    ExerciseGroupsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes,
    AlertModule.forRoot(),
    CalendarModule.forRoot(),
    BrowserAnimationsModule,
     InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
