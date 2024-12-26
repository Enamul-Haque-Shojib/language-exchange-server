/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./User.constant";

export type TUser = {
  name: string;
  photoURL?: string;
  email: string;
  role: string;
  aboutMe: string;
};

export type TImageTutor = {
  tutorImage: string;
};

export type TFeedBack = {
  feedbackUserPhoto: string;
  name:string;
  lifeStyle: string;
  feedBack: string;
}




export interface UserStaticModel extends Model<TUser> {
  isEmailExists(email: string) : Promise<boolean>
  isUserExistsByEmail(email: string) : Promise<TUser>
  isUserExists(email: string) : Promise<TUser>
}


export type TUserRole = keyof typeof USER_ROLE;
