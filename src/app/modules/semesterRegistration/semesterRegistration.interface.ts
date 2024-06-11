import { Types } from "mongoose";

export type TSemesterRegistration ={
    academySemester:Types.ObjectId;
    status:'upcoming'|'ongoing'|'ended';
    startDate:Date;
    endDate:Date;
    minCreated:number;
    maxCreated:number;
}