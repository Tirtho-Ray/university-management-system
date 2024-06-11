import sandResponse from "../../utils/sendResponce";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AcademicFacultyServices } from "./academicFaculty.services";


const createAcademicFaculty =catchAsync( async (req, res)=>{
    const result  = await AcademicFacultyServices.creteAcademicFacultyIntoDB(req.body);
    sandResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Academic faculty create succfully",
        data:result,
    })
});

const getAllAcademicFaculty = catchAsync(async(req,res) =>{

    const result = await AcademicFacultyServices.getAllAcademicFacultyIntoDB();
    sandResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Academic faculty find all succfully",
        data:result,
    })
})

const singleGetAcademicFaculty = catchAsync(async(req,res)=>{
    const {academicFacultyId} = req.params;

    const result = await AcademicFacultyServices.getSingleAcademicFacultyIntoDB(academicFacultyId);
    sandResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Academic faculty find all succfully",
        data:result,
    })
})

const updateAcademicFaculty = catchAsync( async (req,res)=>{
    const {academicFacultyId} = req.params;
    const result = await AcademicFacultyServices.updateAcademicIntoDB(academicFacultyId,req.body);
    sandResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Academic Faculty updated successfully",
    data:result,
    })
})

export const AcademicFacultyController ={
    createAcademicFaculty,
    getAllAcademicFaculty,
    singleGetAcademicFaculty,
    updateAcademicFaculty
}