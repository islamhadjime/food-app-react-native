import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartSliceState } from "./types";




const initialState:CartSliceState = {
    totalPrice: 0,
    items: []
}


const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addItem(state,action:PayloadAction<CartItem>){
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if(findItem){
                findItem.count++
            }else{
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum
            }, 0)
        },
        minusItem(state,action:PayloadAction<number>){
            const findItem = state.items.find(obj => obj.id === action.payload)
            if(findItem){
                if(findItem.count > 1){
                    findItem.count--
                }
            }
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum
            }, 0)
        },
        removeItem(state,action:PayloadAction<number>){
            state.items = state.items.filter(obj => obj.id !== action.payload)
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum
            }, 0)
        },
    }
})

export const {addItem,removeItem,minusItem} = cartSlice.actions
export default cartSlice.reducer