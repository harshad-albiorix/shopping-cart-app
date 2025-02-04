"use client";
import { getCartProducts } from "@/lib/api";
import { addToCart } from "@/lib/mutation";
import { setCartProducts } from "@/redux/slices/cartSlice";
import { ProductsType } from "@/types/dashboard.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

interface FetchCartProductsType extends ProductsType {
    quantity: number;
}


export const useCart = () => {
    const dispatch = useDispatch();
    const products = useQuery<FetchCartProductsType[]>({
        queryKey: ["get-cart-products"],
        queryFn: async () => {
            const response = await getCartProducts();
            return response.data;
        },
    });

    const mutation = useMutation({
        mutationKey: ["add-to-cart"],
        mutationFn: addToCart,
    });

    const totalPrice = products?.data?.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const handleAddToCart = async (product: ProductsType) => {
        try {
            await mutation.mutateAsync({
                productId: product.id,
                quantity: 1,
                action: "increase",
            });

            products.refetch();
        } catch (error) {
            console.error(error);
        }
    };

    const handleIncrement = async (product: FetchCartProductsType) => {
        try {
            await mutation.mutateAsync({
                productId: product.id,
                quantity: 1,
                action: "increase",
            });

            products.refetch();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDecrement = async (product: FetchCartProductsType) => {
        try {
            if (product.quantity > 1) {
                await mutation.mutateAsync({
                    productId: product.id,
                    quantity: 1,
                    action: "decrease",
                });
            } else {
                await mutation.mutateAsync({
                    productId: product.id,
                    action: "delete",
                });
            }

            products.refetch();
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemoveFromCart = async (product: ProductsType) => {
        try {
            await mutation.mutateAsync({
                productId: product.id,
                action: "delete",
            });

            products.refetch();
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (products.data) {
            dispatch(setCartProducts(products.data));
        }
    }, [dispatch, products.data]);

    return {
        cartProducts: products.data,
        totalPrice,
        cartProductsRefetch: products.refetch,
        handleAddToCart,
        handleIncrement,
        handleDecrement,
        handleRemoveFromCart
    }
}