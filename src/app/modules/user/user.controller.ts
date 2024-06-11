import { UserService } from './user.services';
import sandResponse from '../../utils/sendResponce';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  console.log('Request received');

  const { password, studentData } = req.body; // Ensure both fields are extracted

  if (!studentData) {
    throw new Error('Student data is missing');
  }

  const result = await UserService.createStudentIntoDB(password, studentData);
  sandResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: result,
  });
});



export const UserControllers = {
  createStudent,
};
