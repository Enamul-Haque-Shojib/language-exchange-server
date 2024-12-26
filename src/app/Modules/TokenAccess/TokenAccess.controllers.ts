
import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TokenAccessServices } from "./TokenAccess.services";



const createToken = catchAsync(async (req, res) => {

    
    const result = await TokenAccessServices.createTokenFromJWT(req.body);
    const { accessToken, role } = result;
  
    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: config.NODE_ENV === 'production',
      sameSite: 'strict',
      
    });
  
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Token created successfully!',
      data: {
        role,
      },
    });
  });

 
const removeTokenFromCookie = catchAsync(async (req, res) => {

    res.clearCookie('token', {
        httpOnly: true,
        secure: config.NODE_ENV === 'production',
        // sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
    })

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Token Removed!',
      data:{
        message: 'Token removed successfully'
      }
    });
  });

  export const TokenAccessControllers = {
    createToken,
    removeTokenFromCookie
  }