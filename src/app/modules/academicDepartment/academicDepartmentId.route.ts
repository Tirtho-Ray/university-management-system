import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create-academic-department',
    validateRequest(AcademicDepartmentValidation.createAcademicDepartmentSchema),
    AcademicDepartmentController.createAcademicDepartment
);

router.get('/',AcademicDepartmentController.getAllAcademicDepartment);

router.get(
  '/:academicDepartmentId',
  AcademicDepartmentController.singleGetAcademicDepartment,
);

router.patch(
  '/:academicDepartmentId',
  validateRequest(AcademicDepartmentValidation.createAcademicDepartmentSchema),
  AcademicDepartmentController.updateAcademicDepartment
 
);

export const AcademicDepartmentRoutes = router;
