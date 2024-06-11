import { Days } from './offeredCourse.constant';
import { TOfferedCourse } from './offeredCourse.interface';
import mongoose, { Schema, model } from 'mongoose';

const offeredCourseSchema = new mongoose.Schema<TOfferedCourse>({
  semesterRegistration: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'SemesterRegistration',
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'AcademicFaculty',
  },
  academicDepartments: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'AcademicDepartment',
  },
  courses: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'CourseFaculty',
  },
  faculty: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Faculty',
  },
  maxCapacity: {
    type: Number,
    required: true,
  },
  section: {
    type:Number,
    required: true,
  },
  days: {
    type:[String],
    enum:Days

  },
  startTime:{
    type:String,
    required: true,
  },
  endTime:{
    type:String,
    required: true,
  }
});

export const OfferedCourse = model<TOfferedCourse>('offeredCourse',offeredCourseSchema);
