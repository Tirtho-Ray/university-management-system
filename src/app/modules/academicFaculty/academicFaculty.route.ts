import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { academicFacultyValidation } from './academicFaculty.validation';
const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(academicFacultyValidation.academicFacultyValidationSchema),
  AcademicFacultyController.createAcademicFaculty,
);

router.get('/', AcademicFacultyController.getAllAcademicFaculty);

router.get(
  '/:academicFacultyId',
  AcademicFacultyController.singleGetAcademicFaculty,
);

router.patch(
  '/:academicFacultyId',
  validateRequest(
    academicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.updateAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
