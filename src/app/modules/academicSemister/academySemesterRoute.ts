import express from 'express';
import { AcademySemesterControllers } from './academySemester.Controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademySemesterValidation } from './academySemester.validation';

const router = express.Router();

router.post(
  '/create-academy-semester',
  validateRequest(
    AcademySemesterValidation.createAcademySemesterValidationSchema,//validateRequest
  ),
  AcademySemesterControllers.createAcademySemester,
);

router.get('/',AcademySemesterControllers.getAcademySemester);

export const AcademySemesterRoutes = router;
