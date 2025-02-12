interface Rating {
    rate: number, count: number
}

export interface ProductsType {
    category: string;
    description: string;
    _id: string;
    image: string
    price: number;
    rating: Rating;
    title: string
}

export interface CartProductsType {
    productId: ProductsType;
    quantity: number;
    price: number;

}


export interface FetchCartProductsType {
    _id: string;
    userId: string;
    items: CartProductsType[];
    totalAmount: number;
    createdAt: string;
    updatedAt: string;
    __v: 0
}