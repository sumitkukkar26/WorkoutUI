import { Category } from "./category";

export class WorkoutModel {
    public workoutId: Number;
    public workoutTitle: String;
    public workoutNote: String;
    public caloriesBurnPerMin: Number;
    public category: Category;
}
