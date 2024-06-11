

import { TAcademySemester } from '../academicSemister/academySemester.interface';
import { User } from './user.model';

// Function to find the last student ID
const findLastStudentID = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      id: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined;
};

// Function to generate a new student ID
export const generatedStudentId = async (studentData: TAcademySemester) => {
  let currentId = '0000';
  const lastStudentId = await findLastStudentID();
  
  if (lastStudentId) {
    const lastStudentSemesterCode = lastStudentId.substring(4, 6); // 02
    const lastStudentYear = lastStudentId.substring(0, 4); // 2030

    if (
      lastStudentSemesterCode === studentData.code &&
      lastStudentYear === studentData.year
    ) {
      currentId = lastStudentId.substring(6); // Get the last 4 digits
    }
  }
  
  const increment = (Number(currentId) + 1).toString().padStart(4, '0');
  const newStudentId = `${studentData.year}${studentData.code}${increment}`;

  return newStudentId;
};