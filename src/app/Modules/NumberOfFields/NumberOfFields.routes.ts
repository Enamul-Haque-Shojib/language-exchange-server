
import express from 'express';
import { NumberOfFieldsControllers } from './NumberOfFields.controllers';

const router = express.Router();

router.get('/stats', NumberOfFieldsControllers.getNumberOfStats);

router.get('/teachers', NumberOfFieldsControllers.getNumberOfLanguageTeacher);

router.get('/teacher_details/:email', NumberOfFieldsControllers.getNumberOfTeacherDetails);

export const NumberOfFieldsRoutes = router;