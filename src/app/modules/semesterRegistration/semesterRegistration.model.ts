import mongoose, { Schema } from 'mongoose';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistrationStatus } from './semesterRegistration.constant';

const semesterRegistrationSchema = new mongoose.Schema<TSemesterRegistration>({
  academySemester: {
    type: Schema.Types.ObjectId,
    unique: true,
    required: true,
    ref: 'AcademySemester',
  },
  status: {
    type: String,
    enum: SemesterRegistrationStatus,
    default: 'upcoming',
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  minCreated: {
    type: Number,

    default: 3,
  },
  maxCreated: {
    type: Number,

    default: 15,
  },
},{
    timestamps:true,
    
});

export const SemesterRegistration = mongoose.model<TSemesterRegistration>(
  'SemesterRegistration',
  semesterRegistrationSchema,
);
