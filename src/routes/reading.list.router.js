import { Router } from 'express';
import readingListController from '../controllers/reading.list.controller.js';
import tokenExtractor from '../middlewares/token.extractor.js';

const router=Router();

router.post('/',readingListController.addToReadingList);

router.put('/:id', tokenExtractor, readingListController.updateReadingList);

export default router;