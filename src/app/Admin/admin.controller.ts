import httpStatus from 'http-status';

import { AdminServices } from './admin.service';
import catchAsync from '../utils/catchAsync';
import sandResponse from '../utils/sendResponce';


const createAdmin = catchAsync(async (req, res) => {
  
    const result = await AdminServices.createAdminFromDB( req.body);
    
      sandResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'admin is retrieved succesfully',
        data: result,
      });
    });


const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.getSingleAdminFromDB(id);

  sandResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is retrieved succesfully',
    data: result,
  });
});

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminsFromDB(req.query);

  sandResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins are retrieved succesfully',
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;
  const result = await AdminServices.updateAdminIntoDB(id, admin);

  sandResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is updated succesfully',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.deleteAdminFromDB(id);

  sandResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is deleted succesfully',
    data: result,
  });
});

export const AdminControllers = {
  getAllAdmins,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
  createAdmin
};