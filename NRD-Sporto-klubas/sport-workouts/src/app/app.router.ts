import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BuildWorkoutComponent } from './components/build-workout/build-workout.component';
import { MyWorkoutsComponent } from './components/my-workouts/my-workouts.component';
import { WorkoutCalendarComponent } from './components/workout-calendar/workout-calendar.component';
import { ViewExerciseComponent } from './components/view-exercise/view-exercise.component';

export const router: Routes = [
    { path: '', redirectTo: 'build-workout/new', pathMatch: 'full' },
    { path: 'build-workout/:id', component: BuildWorkoutComponent },
    { path: 'workout-calendar', component: WorkoutCalendarComponent },
    { path: 'my-workouts', component: MyWorkoutsComponent },
    { path: 'view-exercises', component: ViewExerciseComponent }
];


export const routes: ModuleWithProviders = RouterModule.forRoot(router);