
import express from 'express';
import { TokenAccessControllers } from './TokenAccess.controllers';




const router = express.Router();

router.post('/jwt', TokenAccessControllers.createToken);

router.post('/logout', TokenAccessControllers.removeTokenFromCookie);

export const TokenAccessRoutes = router;