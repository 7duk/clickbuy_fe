export type ApiResponse<T> = {
    code: number;
    message: string;
    data?: T; 
    errors?: Map<string,string>;
    timestamp: string;
}