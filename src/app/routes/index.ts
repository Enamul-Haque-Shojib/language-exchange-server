import express from 'express';
import { CategoryRoutes } from '../Modules/Category/Category.routes';
import { TutorialRoutes } from '../Modules/Tutorials/Tutorial.routes';
import { UserRoutes } from '../Modules/User/User.route';
import { NumberOfFieldsRoutes } from '../Modules/NumberOfFields/NumberOfFields.routes';
import { TokenAccessRoutes } from '../Modules/TokenAccess/TokenAccess.routes';


const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/tutorials',
    route: TutorialRoutes,
  },
  {
    path: '/number_fields',
    route: NumberOfFieldsRoutes,
  },
  {
    path: '/token_access',
    route: TokenAccessRoutes,
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
