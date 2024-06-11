// import {z} from 'zod';
// import { Days } from './offeredCourse.constant';
// // const timeStringSchema = z.string().refine(
// //     (time) => {
// //       const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
// //       return regex.test(time);
// //     },
// //     {
// //       message: 'Invalid time format, expected "HH:MM" in 24-hour format',
// //     }
// //   );
// const timeStringSchema = z.string().refine(
//     (time)=>{
//         const regex =/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
//         return regex.test(time)
//     },{
//         message: 'Invalid time format, expected "HH:MM" in 24-hour format',
//     }
// )

// const createOfferedCourseValidationSchema = z.object({
//     semesterRegistration : z.string(),
//     academicFaculty : z.string(),
//     academicDepartments : z.string(),
//     courses: z.string(),
//     faculty: z.string(),
//     maxCapacity: z.number(),
//     section: z.number(),
//     days: z.array(z.enum(Days as [string, ...string[]])),
//     startTime: timeStringSchema,
//     endTime: timeStringSchema
// })
// .superRefine((body, ctx) => {
//     if (body.startTime && body.endTime) {
//       const start = new Date(`1970-01-01T${body.startTime}:00`);
//       const end = new Date(`1970-01-01T${body.endTime}:00`);
//       if (end <= start) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           message: 'Start time should be before end time!',
//           path: ['endTime'],
//         });
//       }
//     }
//   });
  
// const updateOfferedCourseValidationSchema = z.object({
//     faculty: z.string().optional(),
//     maxCapacity: z.number().optional(),
//     section: z.number().optional(),
//     days:z.enum([...Days] as [string, ...string[]]).optional(),
//     startTime: z.string().optional(),
//     endTime: z.string().optional()
// })

// export const OfferedCourseValidation ={
//     createOfferedCourseValidationSchema,
//     updateOfferedCourseValidationSchema
// }
import { z } from 'zod';
import { Days } from './offeredCourse.constant';

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    return regex.test(time);
  },
  {
    message: 'Invalid time format, expected "HH:MM" in 24-hour format',
  }
);

const baseOfferedCourseSchema = z.object({
  semesterRegistration: z.string(),
  academicFaculty: z.string(),
  academicDepartments: z.string(),
  courses: z.string(),
  faculty: z.string(),
  maxCapacity: z.number(),
  section: z.number(),
  days: z.array(z.enum(Days as [string, ...string[]])),
  startTime: timeStringSchema,
  endTime: timeStringSchema,
});

const createOfferedCourseValidationSchema = baseOfferedCourseSchema.superRefine((body, ctx) => {
  const start = new Date(`1970-01-01T${body.startTime}:00`);
  const end = new Date(`1970-01-01T${body.endTime}:00`);
  if (end <= start) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Start time should be before end time!',
      path: ['endTime'],
    });
  }
});

const updateOfferedCourseValidationSchema = z.object({
  faculty: z.string().optional(),
  maxCapacity: z.number().optional(),
  section: z.number().optional(),
  days: z.array(z.enum(Days as [string, ...string[]])).optional(),
  startTime: timeStringSchema.optional(),
  endTime: timeStringSchema.optional(),
}).superRefine((body, ctx) => {
  if (body.startTime && body.endTime) {
    const start = new Date(`1970-01-01T${body.startTime}:00`);
    const end = new Date(`1970-01-01T${body.endTime}:00`);
    if (end <= start) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Start time should be before end time!',
        path: ['endTime'],
      });
    }
  }
});

export const OfferedCourseValidation = {
  createOfferedCourseValidationSchema: createOfferedCourseValidationSchema._def.schema,
  updateOfferedCourseValidationSchema: updateOfferedCourseValidationSchema._def.schema,
};
