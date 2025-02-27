
import { Router } from "express";

const route = Router();

import authController from "../controllers/auth.controller.js";

route.post('/',authController.login);
route.delete('/',authController.logout);

export default route;