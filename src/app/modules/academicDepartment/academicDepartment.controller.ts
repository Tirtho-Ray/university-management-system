import sandResponse from "../../utils/sendResponce";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AcademicDepartmentServices } from "./academicDepartment.services";



const createAcademicDepartment =catchAsync( async (req, res)=>{
    const result  = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
    sandResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Academic faculty create succfully",
        data:result,
    })
});

const getAllAcademicDepartment = catchAsync(async(req,res) =>{

    const result = await AcademicDepartmentServices.getAllAcademicDepartmentIntoDB();
    sandResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Academic faculty find all succfully",
        data:result,
    })
})

const singleGetAcademicDepartment= catchAsync(async(req,res)=>{
    const {academicDepartmentId} = req.params;

    const result = await AcademicDepartmentServices.singleGetAcademicDepartmentIntoDB(academicDepartmentId);
    sandResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Academic faculty find all succfully",
        data:result,
    })
})

const updateAcademicDepartment= catchAsync( async (req,res)=>{
    const {academicDepartmentId} = req.params;
    const result = await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(academicDepartmentId,req.body);
    sandResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Academic Faculty updated successfully",
    data:result,
    })
})

export const AcademicDepartmentController ={
    createAcademicDepartment,
    getAllAcademicDepartment,
    singleGetAcademicDepartment,
    updateAcademicDepartment

}