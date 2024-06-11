import express from 'express';
import { StudentControllers } from './student.controller';
import { StudentServices } from './student.services';

const router = express.Router();

// router.post('/create-student', StudentControllers.createStudent);
router.get('/',StudentControllers.getAllStudent)
router.get('/:id',StudentControllers.getSingleStudent)
router.delete('/:id',StudentServices.getAllStudentsFromDB)
router.patch('/:id',StudentServices.getAllStudentsFromDB)
export const StudentRoutes = router;
