import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProducts } from "./asyncAction";
import { Product, ProductState, Status } from "./types";

const initialState:ProductState = {
    items: [],
    status: Status.LOADING
}


const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Product[]>) {
            state.items = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = Status.LOADING
                state.items = []
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.items = action.payload
                state.status = Status.SUCCESS
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.status = Status.ERROR
                state.items = []
            })
    }
})

export const {setItems} = productSlice.actions
export default productSlice.reducer