import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sandResponse from "../../utils/sendResponce";
import { SemesterRegistrationService } from "./semesterRegistration.services";

const createSemesterRegistration = catchAsync (
    async(req,res)=>{
        const result  = await SemesterRegistrationService.creteSemesterRegistrationIntoDB(req.body)
        sandResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message:" SemesterRegistration create succfully",
            data:result,
        })
    }
)
const getALlSemesterRegistration = catchAsync(
    async (req,res) =>{
        const result  = await SemesterRegistrationService.getALlSemesterRegistrationIntoDB(req.body);
        sandResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message:" SemesterRegistration get succfully",
            data:result,
        })
    }
)
const getSingleSemesterRegistration = catchAsync(
    async (req,res) =>{
        const {id }= req.params;
        const result  = await SemesterRegistrationService.getSingleSemesterRegistrationIntoDB(id);
        sandResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message:" SemesterRegistration get succfully",
            data:result,
        })
    }
)
// const updateSemesterRegistration = catchAsync(
//     async (req res) => {
//       const { id } = req.params;
//       const result =
//         await SemesterRegistrationService.updateSemesterRegistrationIntoDB(
//           id,
//           req.body,
//         );
  
//         sandResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'Semester Registration is updated successfully',
//         data: result,
//       });

const updateSemesterRegistration = catchAsync(
    async(req,res)=>{
        const {id}= req.params;
        const result = await SemesterRegistrationService.updateSemesterRegistrationIntoDB(id,req.body,)
        sandResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message:" 'Semester Registration is updated successfully",
            data:result,
        })
    }
)
 

export const SemesterRegistrationController = {
    createSemesterRegistration,
    getALlSemesterRegistration,
    getSingleSemesterRegistration,
    updateSemesterRegistration
}