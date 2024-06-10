import express from 'express';
import { saveReview,
         getReviews,
         getReviewCounts
 } from '../../reviews/controller'; 

const router = express.Router();

router.post('', saveReview);
router.get('', getReviews);
router.post('/_counts', getReviewCounts);

export default router;