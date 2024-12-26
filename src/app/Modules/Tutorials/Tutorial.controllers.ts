import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TutorialServices } from "./Tutorial.services";



const createTutorial = catchAsync(async(req, res) => {
    const result = await TutorialServices.createTutorialIntoDB(req.body);

    

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Tutorial created successfully",
        data: result,
    })
});

const updateSingleTutorial = catchAsync(async (req, res) => {
    const result = await TutorialServices.updateSingleTutorialFromDB(req.body, req.params.id);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Tutorial are updated successfully',
      data: result,
    });
  });

const userTutorialBooked = catchAsync(async (req, res) => {

    const result = await TutorialServices.userTutorialBookedFromDB(req.body, req.params.id);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User booked successfully',
      data: result,
    });
  });

const userTutorialReview = catchAsync(async (req, res) => {

    const result = await TutorialServices.userTutorialReviewIntoDB(req.body, req.params.id);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User reviewed successfully',
      data: result,
    });
  });

const studentBookedDelete = catchAsync(async (req, res) => {

    const result = await TutorialServices.studentBookedDeleteFromDB(req.body, req.params.id);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Student booked deleted successfully',
      data: result,
    });
  });

const studentBookedCompleted = catchAsync(async (req, res) => {

    const result = await TutorialServices.studentBookedCompletedFromDB(req.body, req.params.id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Student booked completed successfully',
      data: result,
    });
  });

const teacherStudentDeleted = catchAsync(async (req, res) => {

    const result = await TutorialServices.teacherStudentDeletedFromDB(req.body, req.params.id);

    
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Teacher deleted tutorial successfully',
      data: result,
    });
  });
  
const getSingleTutorials = catchAsync(async (req, res) => {
    const result = await TutorialServices.getSingleTutorialFromDB(req.params.id);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'One Tutorial are retrieved successfully',
      data: result,
    });
  });


const deleteSingleTutorial = catchAsync(async (req, res) => {
    const result = await TutorialServices.deleteSingleTutorialsFromDB(req.params.id);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Tutorial are deleted successfully',
      data: result,
    });
  });



const getAllTutorials = catchAsync(async (req, res) => {

    const result = await TutorialServices.getAllTutorialsFromDB(req.query);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Tutorials are retrieved successfully',
      data: result,
    });
  });

  

const getAllStudentBooked = catchAsync(async (req, res) => {
    const result = await TutorialServices.getAllStudentBookedFromDB(req.query);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'All student booked are retrieved successfully',
      data: result,
    });
  });



export const TutorialControllers ={
    createTutorial,
    getAllTutorials,
    deleteSingleTutorial,
    getSingleTutorials,
    updateSingleTutorial,
    userTutorialBooked,
    userTutorialReview,
    studentBookedDelete,
    getAllStudentBooked,
    studentBookedCompleted,
    teacherStudentDeleted,
  
} 