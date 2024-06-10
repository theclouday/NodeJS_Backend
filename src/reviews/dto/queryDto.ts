export class QueryDto {
    size: number;
    from: number;

    constructor(data: any) {
        this.size = data.size;
        this.from = data.from;
    }
}