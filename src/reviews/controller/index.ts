import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { createReview as createReviewApi,
         getReviewsForBook as getReviewsForBookApi,
         getReviewCounts as getReviewCountsApi
 } from '../../services/review';
import { ReviewSaveDto } from '../../dto/review/reviewSaveDto';
import { QueryDto } from '../../dto/queryDto';
import { BookIdsDto } from '../../dto/review/bookIdsDto';
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

export const getReviewCounts = async (req: Request, res: Response) => {
    try{
        const bookIdsDto = new BookIdsDto(req.body);
        const reviewCounts = await getReviewCountsApi(bookIdsDto.bookIds);
        res.status(200).send(reviewCounts);
    } catch(error) {
        const { message, status } = new InternalError(error);
        res.status(status).send({ message });
    }
};