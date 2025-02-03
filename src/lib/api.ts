


import { ResponseType } from "@/types/common.type";
import apiClient from "./apiClient";
import { ProductsType } from "@/types/dashboard.type";

export const getProducts = async (): Promise<ResponseType<ProductsType[]>> => {
    const { data } = await apiClient.get("/api/products");
    return data;
};

export const getCartProducts = async () => {
    const { data } = await apiClient.get(`/api/cart`);
    return data
}