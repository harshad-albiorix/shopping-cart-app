


import { ResponseType } from "@/types/common.type";
import apiClient from "./apiClient";
import { ProductsType } from "@/types/dashboard.type";
import { queryOptions } from "@tanstack/react-query";

interface FetchCartProductsType extends ProductsType {
    quantity: number;
}


export const getProducts1 = async (): Promise<ResponseType<ProductsType[]>> => {
    const { data } = await apiClient.get("/api/products");
    return data;
};

export const getProducts = queryOptions({
    queryKey: ['get-products'],
    queryFn: async (): Promise<ResponseType<ProductsType[]>> => {
        const { data } = await apiClient.get('/api/products')
        return data
    },
})

export const getCartProducts = queryOptions({
    queryKey: ['get-cart-products'],
    queryFn: async (): Promise<ResponseType<FetchCartProductsType[]>> => {
        const { data } = await apiClient.get(`/api/cart`);
        return data
    },
})