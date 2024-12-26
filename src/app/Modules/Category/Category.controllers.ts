import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CategoryServices } from "./Category.services";


const createCategory = catchAsync(async(req, res) => {
    const result = await CategoryServices.createCategoryIntoDB(req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Category created successfully",
        data: result,
    })
});

const getAllCategories = catchAsync(async (req, res) => {
    const result = await CategoryServices.getAllCategoriesFromDB();
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Categories are retrieved successfully',
      data: result,
    });
  });

export const CategoryControllers ={
    createCategory,
    getAllCategories
} 