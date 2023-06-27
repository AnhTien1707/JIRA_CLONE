import { createSlice } from "@reduxjs/toolkit";
import { getAllPriority, getAllStatus, getAllTaskType, getCommentTask, getTaskDetail, getUserTask } from "./thunkAction";
const initialState = {
    arrStatus : [],
    arrTaskType : [],
    arrPriority : [],
    arrValueCreateTask : 
        {
            statusId: 1,
            originalEstimate: 1,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            typeId: 1,
            priorityId: 1
        }
    ,
    arrGetUserTask :[],
    arrTaskDetail : [],
    }
export const {reducer:QuanLyTaskReducer , actions:QuanLyTaskAction} = createSlice({
    name : 'QuanLyTask',
    initialState,
    reducer : {
        changeAssign : (state) =>{
            state.arrTaskDetail = true
           
        }
    },
    extraReducers :(buider) =>{
       buider.addCase(getAllStatus.fulfilled,(state,action)=>{
            state.arrStatus = action.payload
       })
       buider.addCase(getAllTaskType.fulfilled,(state,action)=>{
            state.arrTaskType = action.payload
       })
       buider.addCase(getAllPriority.fulfilled,(state,action)=>{
        state.arrPriority = action.payload
       })
       buider.addCase(getUserTask.fulfilled,(state,action)=>{
        state.arrGetUserTask = action.payload
       })
       buider.addCase(getTaskDetail.fulfilled,(state,action)=>{
        state.arrTaskDetail = action.payload
       })
     
    }
})