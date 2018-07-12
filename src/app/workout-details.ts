import { WorkoutModel } from "./workout-model";

export class WorkoutDetails {
    public startDate: Date;
    public startTime: Date;
    public endDate: Date;
    public endTime: Date;
    public workout: WorkoutModel;
    public comment: string;
    public status: boolean;
}
