import { CartProductsType } from '@/types/dashboard.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface CartState {
    items: CartProductsType[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartProducts(state, action: PayloadAction<CartProductsType[]>) {
            state.items = action.payload;
        },
    },
});

export const { setCartProducts, } = cartSlice.actions;
export default cartSlice.reducer;

