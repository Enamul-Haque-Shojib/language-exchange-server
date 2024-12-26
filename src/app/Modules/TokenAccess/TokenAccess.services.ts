import config from "../../config";
import AppError from "../../errors/AppError";
import { UserModel } from "../User/User.model";
import { TUser } from "../User/User.type";
import { createToken } from "../User/User.utils";


const createTokenFromJWT = async (userData: TUser) => {


  let user = userData;
 
    
      if(user.role == null){
      user = await UserModel.isUserExists(userData.email);
        if(!user) throw new AppError(400, 'User not found')
      }
    
   
  

  const role = user.role;
  const JwtPayload = {
    userEmail: user.email,
    role,
  };

  
  const accessToken = createToken(
    JwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );


  return {
    role,
    accessToken,
  };


};


export const TokenAccessServices = {
    createTokenFromJWT,

}