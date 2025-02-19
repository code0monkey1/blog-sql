
import { Router } from "express";

const route = Router();

import loginController from "../controllers/login.controller.js";

route.post('/',loginController.login);

export default route;