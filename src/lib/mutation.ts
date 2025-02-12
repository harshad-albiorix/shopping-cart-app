import apiClient from "./apiClient";

export interface AddToCartPayload {
    productId: string;
    quantity?: number;
    isIncreasing?: boolean;
}

export const addToCart = async (credentials: AddToCartPayload) => {
    const { data } = await apiClient.post("/cart/add-to-cart", credentials);
    return data;
};

export const removeCartItem = async (productId: string) => {
    const { data } = await apiClient.delete(`/cart/delete-cart-item/${productId}`);
    return data;
};

