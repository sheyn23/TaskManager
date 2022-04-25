export class TaskManagerResponse<T = {}> {
    public data: T;
    public status?: number;
    public message?: string;
    public errorInfo?: any;

    constructor(response: TaskManagerResponse<T>) {
        this.data = response.data;
        this.status = response.status;
        this.message = response.message;
        this.errorInfo = response.errorInfo;
    }
}