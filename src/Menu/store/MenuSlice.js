import {createSlice} from '@reduxjs/toolkit'
import { fetchAllToppings, fetchMenu,fetchOneMenu,fetchToppings } from './Menu.action'
const fetchMenuExtraReducer = {
    [fetchMenu.pending]:(state,action)=>{
        state.loading=true
    },
    [fetchMenu.fulfilled]:(state,action)=>{
        state.menus = action.payload;
        state.loading = false;
    },
    [fetchMenu.rejected]:(state,action)=>{
        state.loading = false
    },
}
const fetchAllToppingsExtraReducer ={
    [fetchAllToppings.pending]:(state,action)=>{
        state.loading=true
    },
    [fetchAllToppings.fulfilled]:(state,action)=>{
        state.alltoppings=action.payload;
        state.loading=false;
    },
    [fetchAllToppings.rejected]:(state,action)=>{
        state.loading=false;
    },
}
const fetchOneMenuExtraReducer ={
    [fetchOneMenu.pending]:(state,action)=>{
        state.loading=true
    },
    [fetchOneMenu.fulfilled]:(state,action)=>{
        state.onemenu=action.payload;
        state.loading=false;
    },
    [fetchOneMenu.rejected]:(state,action)=>{
        state.loading = false;
    },
}
const fetchToppingsExtraReducer={
    [fetchToppings.pending]:(state,action)=>{
        state.loading=true
    },
    [fetchToppings.fulfilled]:(state,action)=>{
        state.toppings=action.payload;
    },
    [fetchToppings.rejected]:(state,action)=>{
        state.loading = false;
    },
}
const MenuSlice =createSlice({
    name:'Menu',
    initialState:{
        menus:[],
        onemenu:[],
        alltoppings:[],
        toppings:[],
        loading:false,
    },
    reducer:{
        StoresAdded(state,action){
            state.menus.push(action.payload)
        },
        FetchOneMenu(state,action){
            state.onemenu.push(action.payload)
        },
        FetchToppings(state,action){
            state.toppings.push(action.payload)
        },
        FetchAllToppings(state,action){
            state.alltoppings.push(action.payload)
        },
    },
    extraReducers:{
        ...fetchMenuExtraReducer,
        ...fetchOneMenuExtraReducer,
        ...fetchAllToppingsExtraReducer,
        ...fetchToppingsExtraReducer
    },
})
export const { StoresAdded,FetchOneMenu,FetchToppings } = MenuSlice.actions
export default MenuSlice.reducer