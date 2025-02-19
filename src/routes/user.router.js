
import { Router } from "express";

import userController from "../controllers/user.controller.js";

const route = Router();

route.post('/',userController.postUser);

route.get('/',userController.getAllUsers);

route.put('/:username',userController.updateUserByUsername);


export default route;