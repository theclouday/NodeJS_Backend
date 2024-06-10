import express from 'express';
import ping from '../reviews/controller/ping';
import reviews from './review';

const router = express.Router();

router.get('/ping', ping);

router.use('/api/reviews', reviews)

export default router;