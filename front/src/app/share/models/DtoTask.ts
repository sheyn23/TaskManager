import { Guid } from 'guid-typescript';

export class DtoTask {

    public id: Guid;
    public name: string;
    public description: string;
    public priority: string[];
    public marks: string[];
    public createdAt: Date;

    constructor(response: DtoTask) {
        this.id = response.id;
        this.name = response.name;
        this.description = response.description;
        this.priority = response.priority
        this.marks = response.marks
        this.createdAt = response.createdAt
    }
}