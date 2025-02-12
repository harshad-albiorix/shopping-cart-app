"use client";
import { getCartProducts } from "@/lib/api";
import { addToCart, removeCartItem } from "@/lib/mutation";
import { setCartProducts } from "@/redux/slices/cartSlice";
import { CartProductsType, ProductsType } from "@/types/dashboard.type";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";



export const useCart = () => {
    const dispatch = useDispatch();

    const products = useSuspenseQuery(getCartProducts);

    const mutation = useMutation({
        mutationKey: ["add-to-cart"],
        mutationFn: addToCart,
    });

    const removeCartItemMutation = useMutation({
        mutationKey: ["remove-cart-item"],
        mutationFn: removeCartItem
    })

    const totalPrice = products?.data?.data?.items?.reduce(
        (total, item) => total + item?.price * item.quantity,
        0
    );

    const handleAddToCart = async (product: ProductsType) => {

        try {
            await mutation.mutateAsync({
                productId: product._id,
                quantity: 1,
                isIncreasing: true
            });

            products.refetch();
        } catch (error) {
            console.error(error);
        }
    };

    const handleIncrement = async (product: CartProductsType) => {
        try {
            await mutation.mutateAsync({
                productId: product.productId?._id,
                quantity: 1,
                isIncreasing: true
            });

            products.refetch();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDecrement = async (product: CartProductsType) => {
        try {
            if (product.quantity > 1) {
                await mutation.mutateAsync({
                    productId: product?.productId?._id,
                    quantity: 1,
                    isIncreasing: false
                });
            } else {
                await removeCartItemMutation.mutateAsync(product?.productId?._id)
            }

            products.refetch();
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemoveFromCart = async (product: CartProductsType) => {
        try {
            await removeCartItemMutation.mutateAsync(product?.productId?._id)

            products.refetch();
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (products.data) {
            dispatch(setCartProducts(products?.data?.data?.items));
        }
    }, [dispatch, products.data]);

    return {
        cartProducts: products.data.data?.items,
        totalPrice,
        cartProductsRefetch: products.refetch,
        handleAddToCart,
        handleIncrement,
        handleDecrement,
        handleRemoveFromCart
    }
}