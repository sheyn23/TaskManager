export class TaskManagerResponse<T = {}> {
    public data: T;
    public status?: number;

    constructor(response: TaskManagerResponse<T>) {
        this.data = response.data;
        this.status = response.status;
    }
}