/* eslint-disable no-unused-vars */
import { Model } from "mongoose";


export type TCategory = {
    title: string;
    teachers: number;
}

export interface CategoryStaticModel extends Model<TCategory> {
    isCategoryExists(title: string) : Promise<boolean>
}