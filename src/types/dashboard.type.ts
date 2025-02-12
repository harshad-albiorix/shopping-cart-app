interface Rating {
    rate: number, count: number
}

export interface ProductsType {
    category: string;
    description: string;
    id: number;
    image: string
    price: number;
    rating: Rating;
    title: string
}

export interface FetchCartProductsType extends ProductsType {
    quantity: number;
}
