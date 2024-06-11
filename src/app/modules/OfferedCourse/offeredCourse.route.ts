import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { OfferedCourseValidation } from './offeredCourse.validation';
import { OfferedCourseController } from './offeredCourse.controller';

const router = express.Router();

router.post(
  '/create-Offered-course',
  validateRequest(OfferedCourseValidation.createOfferedCourseValidationSchema),
  OfferedCourseController.createOfferedCourse
)
router.get("/",OfferedCourseController.getOfferedCourse)

export const OfferedCourseRoute = router;