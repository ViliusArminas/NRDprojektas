import { MuscleGroup } from 'app/models/muscle-group'
import { Exercise } from 'app/models/exercise'

export class Workout {
    workoutId: number;
    workoutName: string;
    exercises: Exercise[];
    muscleGroups: MuscleGroup[];
}
