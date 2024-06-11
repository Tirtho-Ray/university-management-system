/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import config from '../config';
import { TErrorSource } from '../interace/error';
import { handleZodError } from '../Error/handelZodError';
import handleValidationError from '../Error/handelValidationError';
import handelCastError from '../Error/handelCastError';
import handleDuplicateKeyError from '../Error/handelDuplicatedError';
import appError from '../Error/appError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // setting default value
  let statusCode =500;
  let message ='Something went wrong'; // Ensure the default message is only used if err.message doesn't exist

  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];


  if (err instanceof ZodError) {
    const simplifiedErr = handleZodError(err);
    statusCode = simplifiedErr.statusCode;
    message = simplifiedErr.message;
    errorSources = simplifiedErr.errorSources;
  }else if (err?.name === 'CastError'){
    const simplifiedErr = handelCastError(err)
    statusCode= simplifiedErr?.statusCode;
    message= simplifiedErr?.message;
    errorSources = simplifiedErr?.errorSources;
  }else if (err?.code ===  11000){
    const simplifiedErr = handleDuplicateKeyError(err)
    statusCode= simplifiedErr?.statusCode;
    message= simplifiedErr?.message;
    errorSources = simplifiedErr?.errorSources;
  }else if (err instanceof appError){

    statusCode= err?.statusCode;
    message= err?.message;
    errorSources = [{
      path:'',
      message:err.message
    }];
  }else if (err instanceof Error){
    message= err?.message;
    errorSources = [{
      path:'',
      message:err.message
    }];
  }





  return res.status(statusCode).json({
    succeed: false,
    message,
    err,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err.stack : null,
  });
};

export default globalErrorHandler;
