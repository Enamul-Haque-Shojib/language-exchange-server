
import express from 'express';
import { CategoryControllers } from './Category.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidationSchema } from './Category.validation';
const router = express.Router();

router.post(
    '/create-category',
    validateRequest(CategoryValidationSchema.createCategoryValidationSchema),
    CategoryControllers.createCategory

)
router.get(
    '/',
    CategoryControllers.getAllCategories

)

export const CategoryRoutes = router;