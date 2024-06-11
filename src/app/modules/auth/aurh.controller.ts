import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sandResponse from "../../utils/sendResponce";
import { AuthServices } from "./auth.services";

const loginUser = catchAsync(
    async(req,res)=>{
        const result = await AuthServices.loginUser(req.body);
        sandResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: ' user created successfully',
            data: result,
          });
    }
)

export const AuthController = {
    loginUser
}