import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { SemesterRegistrationValidation } from './semesterRegistration.Validation';
import { SemesterRegistrationController } from './semesterRegistration.controller';
const router = express.Router();

router.post(
  '/create-semester-Registration',
  validateRequest(
    SemesterRegistrationValidation.createSemesterRegistrationVAlidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);
router.get('/',SemesterRegistrationController.getALlSemesterRegistration)
router.get('/:id',SemesterRegistrationController.getSingleSemesterRegistration)
router.get('/:id',SemesterRegistrationController.getSingleSemesterRegistration)
router.patch(
  '/:id',
  validateRequest(
    SemesterRegistrationValidation.updateSemesterRegistrationVAlidationSchema,
  ),
  SemesterRegistrationController.updateSemesterRegistration,
);
export const  SemesterRegistrationRouter = router;