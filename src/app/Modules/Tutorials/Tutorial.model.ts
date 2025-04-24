import { model, Schema } from "mongoose";
import { TTutorial, TUserBooked, TUserReview, TutorialStaticModel } from "./Tutorial.interface";
import { Days, DaysNumber } from "./Tutorial.constant";


const userBookedSchema = new Schema<TUserBooked>(
    {
      email: {
        type: String,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
      isCompleted: {
        type: Boolean,
        default: false,
      },
    },
    {
      _id: false,
    },
  );
const userReviewSchema = new Schema<TUserReview>(
    {
      reviewUserPhotoURL: {
        type: String,
      },
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      comment: {
        type: String,
      },
     
    },
    {
      _id: false,
      timestamps: true
    
    },
  );

const tutorialSchema = new Schema<TTutorial, TutorialStaticModel>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        userImageURL: {
            type: String,
            required: true,
        },
        tutorialImageURL: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        language: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        review: {
            type: Number,
            default: 0
        },
        userReview: [userReviewSchema],
        
        days: [
            {
                type: String,
                enum: Days,
            }
        ],
        daysNumber: [
            {
                type: Number,
                enum: DaysNumber,
            }
        ],
        time: {
            type: String,
            required: true,
        },
       
        userBooked: [userBookedSchema]

    },
    {
        timestamps: true
    }
);

// tutorialSchema.pre('find', function (next) {
//   this.find({ 'userBooked.isDeleted': { $ne: true } });
//   next();
// });




tutorialSchema.statics.isUserExists = async function (email: string) {
  return await TutorialModel.find({ email })
};


export const TutorialModel = model<TTutorial, TutorialStaticModel>('Tutorial', tutorialSchema);