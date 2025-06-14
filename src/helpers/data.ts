import type { Item } from "../api/itemApi";

export type ApiResponse<T> = {
    code: number;
    message: string;
    data?: T; 
    errors?: Map<string,string>;
    timestamp: string;
}


export interface ItemCart {
    id: number;
    item: Item;
    quantity: number;
    account_id: number;
    created_at: string;
    last_modified_at: string;
}
