import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sandResponse from "../../utils/sendResponce";
import { OfferedCourseServices } from "./offeredCourse.services";

const createOfferedCourse = catchAsync(
    async(req,res)=>{
        const result = await OfferedCourseServices.createOfferedCourseIntoDB(req.body);
        sandResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message:" SemesterRegistration create succfully",
            data:result,
        })
    }
)
const getOfferedCourse = catchAsync(
    async(req,res)=>{
        const result = await OfferedCourseServices.geAllOffered(req.body);
        sandResponse(res,{
            statusCode:httpStatus.OK,
            success:true,
            message:" get create succfully",
            data:result,
        })
    }
)

export const OfferedCourseController ={
    createOfferedCourse,
    getOfferedCourse
}