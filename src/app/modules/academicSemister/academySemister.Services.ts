import { TAcademySemester } from "./academySemester.interface";
import { AcademySemestersSchema } from "./academySemester.model";
import { academicSemesterNameMap } from "./academySemisterConstant";

const createAcademySemesterIntoDB = async(payload:TAcademySemester)=>{

    // semester name --> semester code
   
  

    if(academicSemesterNameMap[payload.name]!==payload.code){
        throw new Error("invalid semester code");
    }

    const result = await AcademySemestersSchema.create(payload);
    return result;

}
const getAllAcademySemesterIntoDB = async()=>{
    const result = AcademySemestersSchema.find();
    return result
}

export const AcademySemesterServices ={
    createAcademySemesterIntoDB,
    getAllAcademySemesterIntoDB
}