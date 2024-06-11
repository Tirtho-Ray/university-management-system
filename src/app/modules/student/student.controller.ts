import {  Request, Response } from 'express';
import { StudentServices } from './student.services';
import catchAsync from '../../utils/catchAsync';

// get all students DB
const getAllStudent = catchAsync(async (req, res) => {
  const student = await StudentServices.getAllStudentsFromDB(req.query);
  res.status(200).json({
    succeed: true,
    massage: 'Students are retrieved successfully',
    data: student,
  });
});

// get single Student form DB
const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const singleStudentData =
    await StudentServices.getSingleStudentFromDB(id);
  res.status(200).json({
    succeed: true,
    message: ' single student find successfully ',
    data: singleStudentData,
  });
});

// deleted data form db
const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const singleStudentData = await StudentServices.deleteStudentDb(id);
  res.status(200).json({
    succeed: true,
    message: ' single student deleted successfully ',
    data: singleStudentData,
  });
});
const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const singleStudentData = await StudentServices.updateStudentIntoDB(id);
  res.status(200).json({
    succeed: true,
    message: ' single student deleted successfully ',
    data: singleStudentData,
  });
});

export const StudentControllers = {
  getAllStudent,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
