import apiClient from "./apiClient";

export interface AddToCartPayload {
    productId: string;
    quantity: number;
}

export const addToCart = async (credentials: AddToCartPayload) => {
    const { data } = await apiClient.post("/api/cart", credentials);
    return data;
};