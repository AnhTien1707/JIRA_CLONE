import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanLyTaskServices } from "../../services/quanLyTask.services";
import { toast } from "react-toastify";



export const getAllStatus = createAsyncThunk(
    "QuanLyTask/getAllStatus",
    async(payload,{rejectWithValue}) =>{
        try{
            const res = await quanLyTaskServices.getAllStatus()
          
            return res.data.content
        }
        catch(error){
           
            return rejectWithValue(error)
        }
    }
)
export const getAllTaskType = createAsyncThunk (
    "QuanLyTask/getAllTaskType",
    async(payload,{rejectWithValue}) =>{
        try{
            const res = await quanLyTaskServices.getAllTaskType()
            return res.data.content
        }
        catch(error){
            return rejectWithValue(error)
        }
    }
)

export const getAllPriority = createAsyncThunk(
    "QuanLyTask/getAllPriority",
    async(payload,{rejectWithValue})=>{
        try{
            const res = await quanLyTaskServices.getAllPriority()
            return res.data.content
        }
        catch(error){
            rejectWithValue(error)
        }
    }
)
export const createTask = createAsyncThunk(
    "QuanLyTask/createTask",
    async(payload,{rejectWithValue})=>{
        try{
            const res = await quanLyTaskServices.createTask(payload)
            
            
                toast.success("Bạn đã tạo task thành công")
           
        }
        catch(error){
            toast.error('Có lỗi khi tạo!')
            rejectWithValue(error)
        }
    }
)
export const getUserTask = createAsyncThunk(
    'QuanLyTask/getuserTask',
    async(payload,{rejectWithValue})=>{
        try{
            const res = await quanLyTaskServices.getUserTask(payload)
            
            return res.data.content
        }
        catch(error){
            
            rejectWithValue(error)
        }
    }
)
export const removeUserTask = createAsyncThunk(
    'QuanLyTask/removeUserTask',
    async(payload,{rejectWithValue})=>{
        try{
            const res = await quanLyTaskServices.removeUserTask(payload)
        
        }
        catch(error){
            
            rejectWithValue(error)
        }
    }
)

export const getTaskDetail = createAsyncThunk(
    'QuanLyTask/getTaskDetail',
    async(payload,{rejectWithValue})=>{
        try{
            const res = await quanLyTaskServices.getTaskDetail(payload)
           
            return res.data.content
        }
        catch(error){
            
            rejectWithValue(error)
        }
    }
)
export const updateStatusTask = createAsyncThunk(
    'QuanLyTask/updateStatusTask',
    async(payload,{rejectWithValue})=>{
        try{
            const res = await quanLyTaskServices.updateStatusTask(payload)
           
           
        }
        catch(error){
            
            rejectWithValue(error)
        }
    }
)
export const updateTask = createAsyncThunk(
    'QuanLyTask/updateTask',
    async(payload,{rejectWithValue})=>{
        try{
            const res = await quanLyTaskServices.updateTask(payload)
            
        }
        catch(error){
            return rejectWithValue(error);
        }
    }
)
export const postCommentTask = createAsyncThunk(
    'QuanLyTask/postCommentTask',
    async(payload,{rejectWithValue})=>{
        try{
            const res = await quanLyTaskServices.postCommentTask(payload)
            
        }
        catch(error){
            return rejectWithValue(error);
        }
    }
)
export const deleteCommentTask = createAsyncThunk(
    'QuanLyTask/deleteCommentTask',
    async(payload,{rejectWithValue})=>{
        try{
            const res = await quanLyTaskServices.deleteCommentTask(payload)
           toast.success("Delete Success")
        }
        catch(error){
            return rejectWithValue(error);
        }
    }
)
export const deleteTask = createAsyncThunk(
    'QuanLyTask/deleteTask',
    async(payload,{rejectWithValue})=>{
        try{
            const res = await quanLyTaskServices.deleteTask(payload)
           toast.success("Delete Success")
        }
        catch(error){
            return rejectWithValue(error);
        }
    }
)
