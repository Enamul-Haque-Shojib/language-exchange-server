import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { NumberOfFieldsServices } from "./NumberOfFields.services";




const getNumberOfStats = catchAsync(async (req, res) => {
    const result = await NumberOfFieldsServices.getNumberOfStatsFromDB();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Get Stats Number succesfully',
        data: result,
      });

});

const getNumberOfLanguageTeacher = catchAsync(async (req, res) => {
    const result = await NumberOfFieldsServices.getNumberOfLanguageTeacherFromDB();

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Get Number of language teachers succesfully',
        data: result,
      });

});

const getNumberOfTeacherDetails = catchAsync(async (req, res) => {
    const result = await NumberOfFieldsServices.getNumberOfTeacherDetailsFromDB(req.params.email);


    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Get Number of teacher details succesfully',
        data: result,
      });

});

export const NumberOfFieldsControllers = {
    getNumberOfStats,
    getNumberOfLanguageTeacher,
    getNumberOfTeacherDetails
}