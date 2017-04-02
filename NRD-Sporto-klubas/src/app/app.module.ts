import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routes } from './app.router';

import { AppComponent } from './app.component';
import { BuildWorkoutComponent } from './components/build-workout/build-workout.component';
import { MyWorkoutsComponent } from './components/my-workouts/my-workouts.component';
import { AddExerciseComponent } from './components/add-exercise/add-exercise.component';
import { ViewExerciseComponent } from './components/view-exercise/view-exercise.component';



@NgModule({
  declarations: [
    AppComponent,
    BuildWorkoutComponent,
    MyWorkoutsComponent,
    AddExerciseComponent,
    ViewExerciseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
