import mongoose from 'mongoose';
import axios from 'axios';
import Review from '../model/review';
import { ReviewSaveDto } from '../dto/review/reviewSaveDto';


export const createReview = async (
    reviewDto: ReviewSaveDto
): Promise<string> => {
    await validateReview(reviewDto);
    const review  = await new Review(reviewDto).save();
    return (review._id as string);
};

export const getReviewsForBook = async ( 
    bookId: string, 
    size: number,
    from: number
) => {
    const bookExist = await checkBookExist(bookId);
    if(!bookExist) {
        throw new Error("Book does not exist");
    }

    const reviews = await Review.find({ bookId: bookId })
        .sort({ createdAt: -1 })
        .skip(from)
        .limit(size)
        .exec();
    
    return reviews;
};

export const getReviewCounts = async (bookIds: string[]) => {
    const reviewCounts = await Review.aggregate([
        { $match: { bookId: { $in: bookIds } } },
        { $group: { _id: "$bookId", count: { $sum: 1 } } }
    ]);

    const response: { [key: string]: number } = {};
    reviewCounts.forEach(reviewCount => {
        response[reviewCount._id] = reviewCount.count;
    });

    return response;
};

export const validateReview = async (reviewDto: ReviewSaveDto) => {
    if(!reviewDto.title || typeof reviewDto.title !== 'string') {
        throw new Error("Title is required and must be a non-numeric string");
    }
    if(!reviewDto.text) {
        throw new Error("Text is required");
    }
    if(!reviewDto.author || typeof reviewDto.author !== 'string') {
        throw new Error("Author is required and must be a non-numeric string");
    }
    if(!reviewDto.grade || typeof reviewDto.grade !== 'number') {
        throw new Error("Grade is required and must be a number");
    }else if(reviewDto.grade <0 || reviewDto.grade > 10) {
        throw new Error("The grade should be in the range of 0 to 10 inclusive");
    }
    if(!reviewDto.bookId) {
        throw new Error("Book ID is required");
    }else {
        const bookExist = await checkBookExist(reviewDto.bookId);
        if(!bookExist) {
            throw new Error("Book does not exist");
        }
    }
};

export const checkBookExist = async (
    bookId: string
): Promise<boolean> => {
    try {
        const response = await axios.get(`http://localhost:8080/api/books/${bookId}`);
        return response.status === 200;
    } catch (error) {
        console.error('Error checking book: ', error);
        return false;
    }
}; 