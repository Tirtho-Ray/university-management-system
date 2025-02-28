import { Types } from "mongoose";

export type Days = 'Sat'| 'Sun'| 'Mon'| 'Tue'| 'Wed'| 'Thu'| 'Fri';


export type TOfferedCourse = {
    semesterRegistration : Types.ObjectId;
    academicFaculty : Types.ObjectId;
    academicDepartments ?: Types.ObjectId;
    courses: Types.ObjectId;
    faculty: Types.ObjectId;
    maxCapacity: number;
    section:number;
    days:Days[];
    startTime:string;
    endTime:string;

}