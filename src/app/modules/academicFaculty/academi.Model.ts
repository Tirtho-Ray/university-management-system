import { Schema, model } from 'mongoose';
import { TAcademicFaculty } from './academic.interface';

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: 'string',
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
);
