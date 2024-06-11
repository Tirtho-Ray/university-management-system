import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AuthLoginValidation } from './auth.validation';
import { AuthController } from './aurh.controller';

const router = express.Router();

router.post('/login',validateRequest(AuthLoginValidation.loginValidationSchema),AuthController.loginUser)

export const LoginRouter = router;
