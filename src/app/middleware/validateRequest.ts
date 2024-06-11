import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
    //   console.log("Request body:", req.body); // Logging request body for debugging
      await schema.parseAsync(req.body); // Correctly pass req.body directly
      next();
    } catch (err) {
    // //   console.error("Validation error:", err); // Logging validation error for debugging
    //   res.status(400).json({
    //     succeed: false,
    //     message: "Validation error",
    //     // error: err.errors
    //   });
    next(err);
    }
  };
};

export default validateRequest;
