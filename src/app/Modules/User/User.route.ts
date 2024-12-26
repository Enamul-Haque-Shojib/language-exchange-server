import express from 'express';
import { UserControllers } from './User.controller';

const router = express.Router();





router.post('/register-user', UserControllers.registerUser);

router.post('/login-user', UserControllers.loginUser);

router.patch('/:userEmail',
    
      UserControllers.updateOneUser);

router.delete('/:userEmail',
    
  UserControllers.deleteOneUser);


router.post('/feedback-user', UserControllers.feedBackUser);
router.get('/feedback', UserControllers.getAllFeedBackUser);

export const UserRoutes = router;
