import { createSlice } from "@reduxjs/toolkit";
import {EditUser, getUser, login,register} from './thunkAction';
let userLogin = null;
if(localStorage.getItem('user')){
    userLogin = JSON.parse(localStorage.getItem('user'));
}
const initialState = {
    user : userLogin,
    userSearch : [],
    isLoading : false,
}

export const {reducer:QuanlyUserReducer , actions:QuanlyUserAction} = createSlice({
    name : 'QuanlyUser',
    initialState,
    reducer : {
      

    },
    extraReducers :(buider) =>{
        buider.addCase(login.fulfilled,(state,action)=>{
            state.user = action.payload
            localStorage.setItem('user',JSON.stringify(action.payload))
            localStorage.setItem('accessToken',state.user.accessToken);
            state.isLoading = false
        })
        buider.addCase(login.pending,(state,action)=>{
           state.isLoading = true
        })
        buider.addCase(register.fulfilled,(state,action)=>{
            state.isLoading = false
        })
        buider.addCase(register.pending,(state,action)=>{
            state.isLoading = true
        })
        buider.addCase(getUser.fulfilled,(state,action)=>{
            state.userSearch = action.payload
        })
        buider.addCase(EditUser.fulfilled,(state,action)=>{
           
            state.user = action.payload
           
        })
    }
})