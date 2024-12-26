
import express from 'express';
import { TutorialControllers } from './Tutorial.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { TutorialValidationSchema } from './Tutorial.validation';


const router = express.Router();


router.post(
    '/create-tutorial',
    
    validateRequest(TutorialValidationSchema.createTutorialValidationSchema),
    TutorialControllers.createTutorial

)
router.patch(
    '/:id',
    
    validateRequest(TutorialValidationSchema.updateTutorialValidationSchema),
    TutorialControllers.updateSingleTutorial

)
router.patch(
    '/user-booked/:id',
    
    TutorialControllers.userTutorialBooked

)
router.patch(
    '/user-review/:id',
    
    TutorialControllers.userTutorialReview
)

router.patch(
    '/student-booked-delete/:id',
    
    TutorialControllers.studentBookedDelete
)
router.patch(
    '/student-booked-complete/:id',
    
    TutorialControllers.studentBookedCompleted
)
router.patch(
    '/teacher-student-delete/:id',
    
    TutorialControllers.teacherStudentDeleted
)

router.delete(
    '/:id',
    
    TutorialControllers.deleteSingleTutorial
)
router.get(
    '/:id',
    
    TutorialControllers.getSingleTutorials
)
router.get(
    '/',
    
    TutorialControllers.getAllTutorials
)

router.get(
    '/student-all-booked/booked',
    
    TutorialControllers.getAllStudentBooked
)


export const TutorialRoutes = router;