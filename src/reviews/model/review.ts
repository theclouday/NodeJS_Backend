import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
    title: string;
    text: string[];
    author: string;
    dateOfPublished: Date;
    grade: number;
    bookId: string;


  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema({
    title: {
        required: true,
        type: String,
    },

    text: {
        required: true,
        type: Array,
    },

    author: {
        required: true,
        type: String,
    },

    dateOfPublished: {
        required: false,
        type: Date,
        default: Date.now,
    },

    grade: {
        required: true,
        type: Number,
    },

    bookId: {
        required: true,
        type: String,
    },
},
{
    timestamps: true,
    timezone: 'UTC',
},
);

const Review = mongoose.model<IReview>('Review', reviewSchema);

export default Review;