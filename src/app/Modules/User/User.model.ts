import { model, Schema } from 'mongoose';
import { TFeedBack, TImageTutor, TUser, UserStaticModel } from './User.type';

const feedBackSchema = new Schema<TFeedBack>({
  feedbackUserPhoto: { type: String, required: true },
  name: { type: String, required: true },
  lifeStyle: {type: String, require: true},
  feedBack: {
    type: String,
    required: true,
  }
});

const imageTutorSchema = new Schema<TImageTutor>({
  tutorImage: { type: String, required: true }
});

const userSchema = new Schema<TUser, UserStaticModel>({
  name: { type: String, required: true },
  photoURL: { type: String },
  email: { type: String, required: true, unique: true },
  role: {type: String, require: true},
  aboutMe: {
    type: String,
    default: "I'm a curious individual with a passion for learning and exploring new things in life and enjoy spending my time outdoors, connecting with nature, and capturing the beauty of the world through photography.I'm always on the lookout for opportunities to expand my skills and embrace new experiences."
  }
});


userSchema.statics.isEmailExists = async function (email: string){
    const existingUser = await UserModel.findOne({email});
    
    return existingUser;
}

userSchema.statics.isUserExists = async function (email: string) {
  return await UserModel.findOne({ email });
};
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await UserModel.findOne({ email });
};

export const UserModel = model<TUser, UserStaticModel>('User', userSchema);

export const FeedBackModel = model<TFeedBack>('FeedBack', feedBackSchema);

export const ImageTutorModel = model<TImageTutor>('TutorImage', imageTutorSchema);
