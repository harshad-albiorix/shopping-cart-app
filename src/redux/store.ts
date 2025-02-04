import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';

// Configuration for redux-persist
const persistConfig = {
    key: 'root', // key is required
    storage, // storage is now required
    // Optionally, you can blacklist or whitelist specific reducers
    // blacklist: ['someReducer'], // reducers not to persist
    // whitelist: ['auth'], // reducers to persist
};

// Create a persisted reducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedCartReducer = persistReducer(persistConfig, cartReducer);

// Configure the store with the persisted reducer
export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        cart: persistedCartReducer,

    },
    // Optional: Add middleware if needed
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

// Create a persistor object
export const persistor = persistStore(store);

// Export types for TypeScript or other use cases
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;