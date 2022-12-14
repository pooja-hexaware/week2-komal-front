import {configureStore} from '@reduxjs/toolkit'
import MenuReducer from '../src/Menu/store/MenuSlice'


const store=configureStore({
    reducer:{
        Menu:MenuReducer
    },
})

export default store;