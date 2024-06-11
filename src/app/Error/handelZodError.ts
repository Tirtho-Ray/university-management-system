import { ZodError, ZodIssue } from "zod";
import { TErrorSource, TGenericError } from "../interace/error";

export const handleZodError = (err: ZodError):TGenericError => {
    const statusCode = 400;
    const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => ({
      path: issue?.path[issue.path.length - 1]?.toString() || '', // Ensure the path is correctly extracted and converted to string
      message: issue.message,
    }));
    return {
      statusCode,
      message: 'validation error',
      errorSources,
    };
  };
