import sandResponse from '../../utils/sendResponce';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AcademySemesterServices } from './academySemister.Services';

const createAcademySemester = catchAsync(async (req, res) => {
  console.log('Request received');

  const result = await AcademySemesterServices.createAcademySemesterIntoDB(
    req.body,
  );

  sandResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' AcademySemester created successfully',
    data: result,
  });
});

const getAcademySemester = catchAsync( async  (req, res) =>{
  const result  = await AcademySemesterServices.getAllAcademySemesterIntoDB();
  sandResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' AcademySemester  get successfully',
    data: result,
  });
} )

export const AcademySemesterControllers = {
  createAcademySemester,
  getAcademySemester
};
