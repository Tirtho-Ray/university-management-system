import mongoose from "mongoose";
import { TErrorSource, TGenericError } from "../interace/error";

const handleValidationError = (err: mongoose.Error.ValidationError):TGenericError => {
  const errorSources: TErrorSource = Object.values(err.errors).map((val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
    return {
      path: val?.path || '',
      message: val?.message || 'Validation error',
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation error',
    errorSources,
  };
};

export default handleValidationError;
