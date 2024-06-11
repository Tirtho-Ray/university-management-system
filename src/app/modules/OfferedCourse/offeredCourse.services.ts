import httpStatus from "http-status";
import appError from "../../Error/appError";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";
import { AcademicFaculty } from "../academicFaculty/academi.Model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Course } from "../../../Course/course.model";
import { Faculty } from "../../Faculty/faculty.model";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {

  const {academicDepartments,semesterRegistration,academicFaculty,courses,faculty} = payload;
  const isSemesterExits = await SemesterRegistration.findById(semesterRegistration);
  if(!isSemesterExits){
    throw new appError(httpStatus.NOT_FOUND,'Semester registration not found');
  }
  const academicSemester = isSemesterExits.academySemester;
  const isAcademicFacultyrExits = await AcademicFaculty.findById(academicFaculty);
  if(!isAcademicFacultyrExits){
    throw new appError(httpStatus.NOT_FOUND,'academicFaculty  not found');
  }
  const isacademicDepartmentsExits = await AcademicDepartment.findById(academicDepartments);
  if(!isacademicDepartmentsExits){
    throw new appError(httpStatus.NOT_FOUND,'academicDepartments  not found');
  }
  const isCoursesExits = await Course.findById(courses);
  if(!isCoursesExits){
    throw new appError(httpStatus.NOT_FOUND,'courses  not found');
  }
  const isfacultyExits = await Faculty.findById(faculty);
  if(!isfacultyExits){
    throw new appError(httpStatus.NOT_FOUND,'faculty  not found');
  }
  const result  = await OfferedCourse.create({...payload,academicSemester})
  return result;

}

const geAllOffered = async (payload: TOfferedCourse) => {
    const result = await OfferedCourse.find(payload);
    return result;
    // Populate all relevant fields
  }
  
  
//   

export const OfferedCourseServices ={
    createOfferedCourseIntoDB,
    geAllOffered
}