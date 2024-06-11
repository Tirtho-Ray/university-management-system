import {z} from "zod"

const academicFacultyValidationSchema = z.object({
    name:z.string({
        invalid_type_error:'academic_faculty must be a string'
    })
   
})
const updateAcademicFacultyValidationSchema = z.object({
    name:z.string({
        invalid_type_error:'academic_faculty must be a string'
    })
    
})

export const academicFacultyValidation ={
    academicFacultyValidationSchema,
    updateAcademicFacultyValidationSchema,
};