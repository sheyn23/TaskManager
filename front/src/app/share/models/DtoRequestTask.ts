export class DtoRequestTask {

    public sortedBy: "asc" | "desc";
    public start: number;
    public count: number;
    public priority: string[];
    public marks: string[]

    constructor(response: DtoRequestTask) {
        this.start = response.start;
        this.count = response.count;
        this.sortedBy = response.sortedBy;
        this.priority = response.priority
        this.marks = response.marks
    }
}