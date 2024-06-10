export class BookIdsDto {
    bookIds: string[];

    constructor(data: any) {
        if(!Array.isArray(data.bookIds)) {
            throw new Error("bookIds must be an array");
        }

        this.bookIds = data.bookIds;
    }
}