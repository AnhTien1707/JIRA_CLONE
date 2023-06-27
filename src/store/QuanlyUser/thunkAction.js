import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanLyUserService } from "../../services/quanLyUser.services";
import { toast } from "react-toastify";
export const login = createAsyncThunk(
    "QuanlyUser/login",
    async(payload,{rejectWithValue}) =>{
        try{
            const res = await quanLyUserService.login(payload);
          
            
            if(res.data.statusCode === 200){
                toast.success("Bạn đã đăng nhập thành công");
                
            }
            return res.data.content
        }
        catch(error){
            if(error){
                toast.error("Bạn đã nhập sai tài khoản hoặc mật khẩu");
            }
            return rejectWithValue(error)
        }
    }
)
export  const register = createAsyncThunk(
    "QuanlyUser/register",
    async(payload,{rejectWithValue})=>{
        try{
            const res = await quanLyUserService.register(payload);
          
            if(res.data.statusCode === 200){
                toast.success("Bạn đã đăng kí tài khoản thành công");
                
            }
            return res.data.content
        }
        catch(error){
            toast.error("Tài khoản đã tồn tại");
            return rejectWithValue(error)
        }
    })
export const getUser = createAsyncThunk(
    "QuanlyUser/getUser",
    async(payload,{rejectWithValue})=>{
        try{
            const res = await quanLyUserService.getUser(payload);
        
           return res.data.content
        }catch(error){
            return rejectWithValue(error)
        }
    })
export const EditUser = createAsyncThunk(
    "QuanlyUser/EditUser",
    async(payload,{rejectWithValue})=>{
        try{
            const res = await quanLyUserService.EditUser(payload);
           
            if(res.data.statusCode === 200){
                alert("Bạn đã cập nhật thành công mời đăng nhập lại !")
            }
        }
        catch(error){
            return rejectWithValue(error)
        }
    }
)