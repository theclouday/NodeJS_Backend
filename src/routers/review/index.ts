import express from 'express';
import { saveReview,
         getReviews,
 } from '../../reviews/controller/review';

const router = express.Router();

router.post('', saveReview);
router.get('', getReviews)

export default router;