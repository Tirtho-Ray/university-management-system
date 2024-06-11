import config from '../../config';
import { TStudent } from '../student/student.interface';
import { User } from './user.model';
import { TUser } from './user.interface';
import { Student } from '../student/student.model';
import { AcademySemestersSchema } from '../academicSemister/academySemester.model';
import { generatedStudentId } from './userUtils';
import { TAcademySemester } from '../academicSemister/academySemester.interface';
import mongoose from 'mongoose';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  if (!studentData) {
    throw new Error('Student data is missing');
  }

  const admissionSemester = await AcademySemestersSchema.findById(studentData.admissionSemester).lean() as TAcademySemester | null;

  if (!admissionSemester) {
    throw new Error('Admission semester not found');
  }

  const studentId = await generatedStudentId(admissionSemester);

  const userData: Partial<TUser> = {
    password: password || (config.default_pass as string),
    role: 'student',
    id: studentId, // Ensure id is generated and awaited
  };

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const newUser = await User.create([userData], { session });

    if (!newUser || newUser.length === 0) {
      throw new Error('Failed to create user');
    }

    studentData.id = newUser[0].id;
    studentData.user = newUser[0]._id;

    const newStudent = await Student.create([studentData], { session });

    await session.commitTransaction();
    session.endSession();

    return newStudent[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error creating user or student:', error);
    throw new Error('Error creating student');
  }
  
};

export const UserService = {
  createStudentIntoDB,
};
