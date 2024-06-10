import mongoose from 'mongoose';
import Review from '../../model/review';
import { ReviewSaveDto } from '../../dto/review/reviewSaveDto';
import axios from 'axios';

export const createReview = async (
    reviewDto: ReviewSaveDto
): Promise<string> => {
    await validateReview(reviewDto);
    const review  = await new Review(reviewDto).save();
    return (review._id as string);
};


export const validateReview = async (reviewDto: ReviewSaveDto) => {
    if(!reviewDto.title) {
        throw new Error("Title is required");
    }
    if(!reviewDto.text) {
        throw new Error("Text is required");
    }
    if(!reviewDto.author) {
        throw new Error("Author is required");
    }
    if(!reviewDto.grade) {
        throw new Error("Grade is required");
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