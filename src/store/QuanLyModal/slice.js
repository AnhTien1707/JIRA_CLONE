import { createSlice } from "@reduxjs/toolkit"

const initialState={
    isModal : false,
    isDrawerTask : false,
    isModalTask : false,
}
export const {reducer:QuanLyModalReducer , actions:QuanLyModalAction} = createSlice({
    name : 'QuanLyModal',
    initialState,
    reducers:{
        openModal:(state) =>{
            state.isModal = true;
        },
        closeModal:(state) =>{
            state.isModal = false;
        },
        openDrawerTask:(state) =>{
            state.isDrawerTask = true;
        },
        CloseDrawerTask:(state) =>{
            state.isDrawerTask = false;
        },
        openModalTask:(state) =>{
            state.isModalTask = true;
        },
        closeModalTask:(state) =>{
            state.isModalTask = false;
        },
      
    }
})