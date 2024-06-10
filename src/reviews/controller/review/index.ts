import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { createReview as createReviewApi,
         getReviewsForBook as getReviewsForBookApi
 } from '../../services/review';
import { ReviewSaveDto } from '../../dto/review/reviewSaveDto';
import { QueryDto } from '../../dto/queryDto';
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

export const getReviews = async (req: Request, res: Response) => {
    try {
        const queryDto = new QueryDto(req.query);
        const reviews = await getReviewsForBookApi(req.body.bookId, queryDto.size, queryDto.from);
        res.status(200).send(reviews);
    } catch (error) {
        const { message, status } = new InternalError(error);
        res.status(status).send({ message });
    }
};