import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
// import appError from "../../Error/appError";

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name:{
        type: "string",
        required: true,
        unique:true,
    },
    academicFaculty:{
        type:Schema.Types.ObjectId,
        required: [true,'user id must required'],
        ref:'AcademicFaculty',
      },
})



// academicDepartmentSchema.pre("save",async function(next){

//     const isDepartmentExist = await AcademicDepartment.findOne({name:this.name});

//     if(isDepartmentExist){
//         throw new appError (404,'Department already exists')
//     }

//     next();
// })

academicDepartmentSchema.pre('findOneAndUpdate', async function(next){
    const query = this.getQuery();

    const isDepartmentExistAlready = AcademicDepartment.findOne(query);

    if(!isDepartmentExistAlready){
        throw new Error ('Department does not   exists')
    }
    next();
})

 export const AcademicDepartment = model<TAcademicDepartment>('AcademicDepartment',academicDepartmentSchema);