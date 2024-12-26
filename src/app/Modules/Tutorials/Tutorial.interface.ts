/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export type TDays = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';

export type TDaysNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 ;

export type TUserBooked = {
    email:string;
    isDeleted: boolean;
    isCompleted: boolean;
};
export type TUserReview = {
  reviewUserPhotoURL: string;
    name:string;
    email:string;
    comment: string;
};


export type TTutorial = {
    name: string,
    email: string,
    userImageURL: string,
    tutorialImageURL: string,
    title:string,
    language: string,
    price: number,
    description: string,
    review: number,
    userReview: [TUserReview],
    days: TDays[],
    daysNumber?: TDaysNumber[],
    time: string,
    userBooked: [TUserBooked];
    
}

export interface TutorialStaticModel extends Model<TTutorial> {

  isUserExists(email: string) : Promise<TTutorial>
}
