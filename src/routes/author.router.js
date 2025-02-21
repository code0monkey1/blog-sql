import {Router} from 'express';
import authorController from '../controllers/author.controller.js';


const route = Router();


route.get('/',authorController.getRankedAuthors);


export default route;

