
import { UserServices } from './User.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';


const registerUser = catchAsync(async(req, res) => {
  const { user: userData } = req.body;

  const result = await UserServices.registerUserIntoDB(userData);

  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User registered successfully",
      data: result
  })
});

const loginUser = catchAsync(async (req, res) => {

  const { user: userData } = req.body;
  const result = await UserServices.loginUserIntoDB(userData);


  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User is logged in successfully!',
    data: result
  });
});


const updateOneUser = catchAsync(async(req, res) => {
  const { userEmail } = req.params;
    const userData = req.body;

    const result = await UserServices.updateOneUserIntoDB(userEmail, userData);

  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User updated successfully",
      data: result,
  })
});

const deleteOneUser = catchAsync(async(req, res) => {
  const { userEmail } = req.params;

    const result = await UserServices.deleteOneUserFromDB(userEmail);

  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User deleted successfully",
      data: result,
  })
});




const feedBackUser = catchAsync(async(req, res) => {

  const result = await UserServices.feedBackUserIntoDB(req.body);

  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User feedback created successfully",
      data: result
  })
});
const getAllFeedBackUser = catchAsync(async(req, res) => {
  

  const result = await UserServices.getAllFeedBackUserIntoDB();

  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User feedback retrieve successfully",
      data: result
  })
});

export const UserControllers = {
  registerUser,
  loginUser,
  deleteOneUser,
  updateOneUser,
  feedBackUser,
  getAllFeedBackUser
};
