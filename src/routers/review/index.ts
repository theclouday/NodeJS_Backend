import express from 'express';
import { saveReview } from '../../reviews/controller/review';

const router = express.Router();

router.post('', saveReview);

export default router;