import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterSliceState, SortProperty, TagType } from "./types";

const initialState:FilterSliceState = {
    search: '',
    categoryId: 0,
    currentPage: 1,
    tag: "Все",
    order: SortProperty.RATING_NUll,
  
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action:PayloadAction<number>) {
            state.categoryId = action.payload
        },
        setCurrentPage(state, action:PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setSearchValue(state, action:PayloadAction<string>) {
            state.search = action.payload
        },
        setSort(state, action:PayloadAction<SortProperty>) {
            state.order = action.payload
        },
        setTag(state, action:PayloadAction<TagType>) {
            state.tag = action.payload.title
        },

        setFilters(state, action:PayloadAction<FilterSliceState>) {
            
        }
    }
});

export const {setCategoryId, setCurrentPage, setSearchValue, setSort, setFilters, setTag} = filterSlice.actions
export default filterSlice.reducer