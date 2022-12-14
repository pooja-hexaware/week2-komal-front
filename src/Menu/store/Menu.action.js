import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const endPoint = 'Menu'

export const fetchMenu = createAsyncThunk('Menu/fetchMenu',async()=>{
    const response = await axios.get('http://localhost:4000/Menu');
    const Menu =await response.data
    console.log(Menu);
    return Menu;
})
export const fetchOneMenu = createAsyncThunk('Menu/fetchOneMenu',async(data)=>{
    const response = await axios.get('http://localhost:4000/Menu/'+data.id);
    const OneMenu = await response.data;
    // OneMenu.map((item)=>{
    //     item.AvailableToppings.map((topp)=>{
    //        // const response = await axios.get('http://localhost:4000/Toppings/'+data.id);
    //     })
    // })
    return OneMenu;
})
export const fetchAllToppings = createAsyncThunk('Toppings/fetchAllTopping',async(data)=>{
    const response = await axios.get('http://localhost:4000/Toppings');
    const AllToppings=await response.data
    console.log(AllToppings);
    return AllToppings;
})
export const fetchToppings = createAsyncThunk('Toppings/fetchTopping',async(data)=>{
    const response = await axios.get('http://localhost:4000/Toppings/'+data.id);
    const Toppings=await response.data
    console.log(Toppings);
    return Toppings;
})