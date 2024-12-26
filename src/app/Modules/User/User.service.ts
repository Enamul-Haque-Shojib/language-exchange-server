import { TFeedBack, TUser } from './User.type';
import { FeedBackModel, UserModel } from './User.model';
import { TutorialModel } from '../Tutorials/Tutorial.model';




const registerUserIntoDB = async (userData: TUser) => {

  let user = await UserModel.isUserExists(userData.email);

  if(!user) {
    user = await UserModel.create(userData);
    
  }
  return user;

};

const loginUserIntoDB = async (userData: TUser) => {

  let user = await UserModel.isUserExists(userData.email);

  if (!user) {
    user = await UserModel.create(userData); 
  }
  return user


};

const deleteOneUserFromDB = async (email: string) => {
  const deleteTutorials = await TutorialModel.deleteMany({
    userEmail: email,
  });
  const deleteUser = await UserModel.deleteOne({ email });
  return { deleteTutorials, deleteUser };
};

const updateOneUserIntoDB = async (email: string, userData: Partial<TUser>) => {
  const result = await UserModel.findOneAndUpdate({ email }, userData, {
    new: true,
  });
  return result;
};



const feedBackUserIntoDB = async (userData: TFeedBack) => {
  
    const feedBack = await FeedBackModel.create(userData);
    
  
  return feedBack;

};
const getAllFeedBackUserIntoDB = async () => {
    const feedBack = await FeedBackModel.find();
    
  return feedBack;

};

export const UserServices = {
  registerUserIntoDB,
  loginUserIntoDB,
  deleteOneUserFromDB,
  updateOneUserIntoDB,
  feedBackUserIntoDB,
  getAllFeedBackUserIntoDB
};
