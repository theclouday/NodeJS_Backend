export class ReviewSaveDto {
    title?: string;
    text?: string[];
    author?: string;
    dateOfPublished?: Date;
    grade?: number;
    bookId?: string;

    constructor(data: Partial<ReviewSaveDto>) {
        this.title = data.title;
        this.text = data.text;
        this.author = data.author;
        this.grade = data.grade;
        this.bookId = data.bookId;
    }
}