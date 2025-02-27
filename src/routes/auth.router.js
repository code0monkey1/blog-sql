
import { Router } from "express";

const route = Router();

import authController from "../controllers/auth.controller.js";
import tokenExtractor from "../middlewares/token.extractor.js";


route.post('/login',authController.login);
route.delete('/logout', tokenExtractor, authController.logout);

export default route;