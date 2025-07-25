import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import cartReducer from "./cart/slice";
import filterReducer from "./filter/slice";
import productReducer from "./products/slice";

export const store = configureStore({
    reducer: {
        product: productReducer,
        filter: filterReducer,
        cart: cartReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector