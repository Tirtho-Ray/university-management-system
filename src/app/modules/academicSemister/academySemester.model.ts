import { Schema, model } from 'mongoose';
import { TAcademySemester } from './academySemester.interface';
import {
  Months,
  academySemesterCode,
  academySemesterName,
} from './academySemisterConstant';

const AcademySemester = new Schema<TAcademySemester>({
  name: {
    type: 'string',
    required: true,
    enum: academySemesterName,
  },
  code: {
    type: 'string',
    required: true,
    enum: academySemesterCode,
  },
  year: {
    type: String,
    required: true,
  },
  startMonth: {
    type: 'string',
    required: true,
    enum: Months,
  },
  endMonth: {
    type: 'string',
    required: true,
    enum: Months,
  },
},
{
  timestamps:true,
});

// AcademySemester.pre('save', async function (next) {
//   const isSemesterExist = AcademySemesters.findOne({
//     name: this.name,
//     year: this.year,
//   });
//   if (isSemesterExist) {
//     throw new Error('Semester already exists !');
//   }
//   next();
// });

export const AcademySemestersSchema = model<TAcademySemester>(
  'AcademySemester',
  AcademySemester,
);
