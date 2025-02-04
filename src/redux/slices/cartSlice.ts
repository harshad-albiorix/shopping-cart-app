import { ProductsType } from '@/types/dashboard.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem extends ProductsType {
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartProducts(state, action: PayloadAction<CartItem[]>) {
            state.items = action.payload;
        },
    },
});

export const { setCartProducts, } = cartSlice.actions;
export default cartSlice.reducer;

