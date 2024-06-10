import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { createReview as createReviewApi } from '../../services/review';
import { ReviewSaveDto } from '../../dto/review/reviewSaveDto';
import { InternalError } from '../../../system/internallError';

export const saveReview = async (req: Request, res: Response) => {
    try {
        const review = new ReviewSaveDto(req.body);
        const id = await createReviewApi({
            ...review,
        });
        res.status(httpStatus.CREATED).send({
            id,
        });
    } catch(error) {
        const { message, status } = new InternalError(error);
        res.status(status).send({ message });
    }
};