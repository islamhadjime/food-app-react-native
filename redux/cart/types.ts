export type CartItem = {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    count: number;
    description: string
}


export interface CartSliceState {
    totalPrice: number;
    items: CartItem[];
}