import httpStatus from 'http-status';
import { FacultyServices } from './faculty.service';
import catchAsync from '../utils/catchAsync';
import sandResponse from '../utils/sendResponce';

const createFaculty = catchAsync(async (req, res) => {
  
const result = await FacultyServices.createFacultyFromDB( req.body);

  sandResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is retrieved succesfully',
    data: result,
  });
});
const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.getSingleFacultyFromDB( id );

  sandResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is retrieved succesfully',
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFacultiesFromDB(req.query);

  sandResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties are retrieved succesfully',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;
  const result = await FacultyServices.updateFacultyIntoDB( id , faculty);

  sandResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is updated succesfully',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req, res) => {
  const {  id } = req.params;
  const result = await FacultyServices.deleteFacultyFromDB(id);

  sandResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is deleted succesfully',
    data: result,
  });
});

export const FacultyControllers = {
  getAllFaculties,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
  createFaculty
};