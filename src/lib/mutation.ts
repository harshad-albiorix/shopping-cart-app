import apiClient from "./apiClient";

export interface AddToCartPayload {
    productId: number;
    quantity?: number;
    action: "increase" | "decrease" | "set" | "delete";
}

export const addToCart = async (credentials: AddToCartPayload) => {
    const { data } = await apiClient.post("/api/cart", credentials);
    return data;
};