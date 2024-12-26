
import { model, Schema } from "mongoose";
import { CategoryStaticModel, TCategory } from "./Category.interface";


const categorySchema = new Schema<TCategory, CategoryStaticModel>(
    {
      
        title: {
            type: String,
            required: true,
            unique: true
        },
        teachers: {
            type: Number,
            default: 0
        },
    },
    {
        timestamps: true,
    }
);

categorySchema.statics.isCategoryExists = async function (title: string){
    const existingCategory = await CategoryModel.findOne({title});
    
    return existingCategory;
}


export const CategoryModel = model<TCategory, CategoryStaticModel>('Category', categorySchema);