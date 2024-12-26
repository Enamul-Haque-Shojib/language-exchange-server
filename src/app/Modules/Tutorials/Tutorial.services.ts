
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { Days, DaysNumber } from "./Tutorial.constant";
import { TTutorial, TUserBooked } from "./Tutorial.interface";
import { TutorialModel } from "./Tutorial.model";
import { CategoryModel } from "../Category/Category.model";
import AppError from "../../errors/AppError";



const createTutorialIntoDB = async (payload: TTutorial) => {

  const daysNumber = payload.days.map((day) => {
    const index = Days.indexOf(day); 
    if (index === -1) {
        throw new Error(`Invalid day: ${day}`); 
    }
    return DaysNumber[index]; 
    });

    
    const updatedPayload = {
        ...payload,
        daysNumber,
    };


    const session = await mongoose.startSession();
    try{
      session.startTransaction();

      const tutorialResult = await TutorialModel.create([updatedPayload], {session});

      if (!tutorialResult.length) {
        throw new AppError(500, 'Failed to create Tutorial');
      }

      const isExistsCategory =await CategoryModel.isCategoryExists(payload.language);

    

      if(!isExistsCategory) {
        const categoryResult = await CategoryModel.create([{title:payload.language}], {session});

        if (!categoryResult.length) {
          throw new AppError(500, 'Failed to create Category');
        }
      }

     

      await session.commitTransaction();
      await session.endSession();

      return tutorialResult;

    }catch(err: any){
      await session.abortTransaction();
      await session.endSession();
      throw new Error(err);
    } 
};

const getSingleTutorialFromDB = async (id: string) => {
    const result = await TutorialModel.findById(id);
    return result;
  };
const updateSingleTutorialFromDB = async (payload: TUserBooked, id: string) => {
    const tutorialData = await TutorialModel.findByIdAndUpdate(id,payload);

    return tutorialData;
  };
  
const userTutorialBookedFromDB = async (payload: TUserBooked, id: string) => {

   const result = await TutorialModel.findOneAndUpdate(
    { 
      _id: id, 
      "userBooked.email": payload.email 
    },
    {
      $set: { "userBooked.$": payload } 
    },
    { 
      new: true, 
      upsert: false 
    }
  );

  if (!result) {
    
    return await TutorialModel.findByIdAndUpdate(
      id,
      {
        $push: { userBooked: payload } 
      },
      { new: true } 
    );
  }

    return result;
  };



  const userTutorialReviewIntoDB = async (payload: TUserBooked, id: string) => {
    
    const tutorial = await TutorialModel.findById(id);

    if (!tutorial) {
      throw new Error("Tutorial not found");
    }
  
    const emailExists = tutorial.userReview.some((review: any) => review.email === payload.email);
  
    const updatePayload: any = {
      $push: {
        userReview: payload, 
      },
    };
  
    if (!emailExists) {
     
      updatePayload.$inc = {
        review: 1,
      };
    }
  
    // Update the document
    const result = await TutorialModel.findByIdAndUpdate(id, updatePayload, { new: true });
  
    return result;
  };

  const studentBookedDeleteFromDB = async (payload: TUserBooked, id: string) => {

    
    const result = await TutorialModel.findOneAndUpdate(
      { _id: id, "userBooked.email": payload.email }, 
      { $set: { "userBooked.$[user].isDeleted": true } }, 
      {
        arrayFilters: [
          { "user.email": payload.email, "user.isDeleted": false }, 
        ],
        new: true, 
      }
    );
  
    return result;
  };

  const studentBookedCompletedFromDB = async (payload: TUserBooked, id: string) => {

    
    const result = await TutorialModel.findOneAndUpdate(
      { _id: id, "userBooked.email": payload.email }, 
      { $set: { "userBooked.$[user].isCompleted": true } }, 
      {
        arrayFilters: [
          { "user.email": payload.email, "user.isCompleted": false }, 
        ],
        new: true, 
        projection: { userBooked: 1, _id: 0 },
      }
    );
  
    return result;
  };


  const teacherStudentDeletedFromDB = async (payload: TUserBooked, id: string) => {

    
    const result = await TutorialModel.findOneAndUpdate(
      { _id: id },
      { $pull: { userBooked: { email: payload.email } } },
      { new: true } 
    );
  
    return result;
  };


  // const markUserAsDeleted = async (tutorialId: string, email: string) => {
  //   const result = await TutorialModel.findByIdAndUpdate(
  //     tutorialId,
  //     {
  //       $set: {
  //         "userBooked.$[user].isDeleted": true,
  //       },
  //     },
  //     {
  //       arrayFilters: [{ "user.email": email }],
  //       new: true, // Return the updated document
  //     }
  //   );
  //   return result;
  // };

  // const removeUserFromBookedList = async (tutorialId: string, email: string) => {
  //   const result = await TutorialModel.findByIdAndUpdate(
  //     tutorialId,
  //     {
  //       $pull: { userBooked: { email } },
  //     },
  //     { new: true } // Return the updated document
  //   );
  //   return result;
  // };




const deleteSingleTutorialsFromDB = async (id: string) => {
    const result = await TutorialModel.findByIdAndDelete(id);
    return result;
  };
const getAllTutorialsFromDB = async (query: Record<string, unknown>) => {
  const TutorialQuery = new QueryBuilder(
    TutorialModel.find(),
    query,
  )
  
    .filter()
   

  const result = await TutorialQuery.modelQuery;
  return result;

  };



const getAllStudentBookedFromDB = async (query: Record<string, unknown>) => {

  
  const TutorialQuery = new QueryBuilder(
    TutorialModel.find({ 'userBooked.isDeleted': { $ne: true } }),
    query,
  )
  
    .filter()
   

  const result = await TutorialQuery.modelQuery;
  return result;

  };




export const TutorialServices = {
    createTutorialIntoDB,
    getAllTutorialsFromDB,
    deleteSingleTutorialsFromDB,
    updateSingleTutorialFromDB,
    getSingleTutorialFromDB,
    userTutorialBookedFromDB,
    userTutorialReviewIntoDB,
    studentBookedDeleteFromDB,
    getAllStudentBookedFromDB,
    studentBookedCompletedFromDB,
    teacherStudentDeletedFromDB
}