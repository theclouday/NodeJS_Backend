import express from 'express';
import ping from '../reviews/ping';
import reviews from '../reviews/reviews.router';

const router = express.Router();

router.get('/ping', ping);

export default router;