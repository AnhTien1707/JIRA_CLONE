import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanLyProjectServices } from "../../services/quanLyProject.services";
import { toast } from "react-toastify";

export const ProjectCategory = createAsyncThunk(
    "QuanLyProject/ProjectCategory",
    async(payload,{rejectWithValue}) =>{
        try{
            const res = await quanLyProjectServices.getAllProjectCategory();
          
            return res.data.content
        }
        catch(error){
            return rejectWithValue(error)
        }
    }
)

export const CreateProject = createAsyncThunk(
    "QuanLyProject/CreateProject",
    async(payload,{rejectWithValue})=>{
        try{
            const res = await quanLyProjectServices.CreateProject(payload);
           
           
            return res.data.content
        }
        catch(error){
            return rejectWithValue(error)
        }
    }
)
export const AllProject = createAsyncThunk(
    "QuanLyProject/AllProject",
    async(payload,{rejectWithValue})=>{
        try{
            const res = await quanLyProjectServices.getAllProject(payload);
          
            return res.data.content

        }catch(error){
            return rejectWithValue(error)
        }
    }
)
export const GetInfoProject = createAsyncThunk(
    "QuanLyProject/GetInfoProject",
    async(payload,{rejectWithValue})=>{
        try{
            const res = await quanLyProjectServices.getProjectDetail(payload);
            
            return res.data.content
        }catch(error){
            return rejectWithValue(error)
        }
    }
)
export const UpdateProject = createAsyncThunk(
    "QuanLyProject/UpdateProject",
    async(payload,{rejectWithValue})=>{
        try{
            const res = await quanLyProjectServices.UpdateProject(payload.id,payload);
       
            if(res.data.statusCode === 200){
                toast.success("Bạn đã edit thành công");
            }
            
        }catch(error){
       
            toast.error("Bạn không có quyền EDIT Project Của người khác !")
            return rejectWithValue(error)

        }
    }
)
export const DeleteProject = createAsyncThunk(
    "QuanLyProject/DeleteProject",
    async(id,{rejectWithValue})=>{
        try{
            const res = await quanLyProjectServices.DeleteProject(id)
            if(res.data.statusCode === 200){
                toast.success("Bạn đã xóa Project thành công");
            }
   

        }catch(error){
            toast.error("Bạn không thể xóa Project của người khác được !")
            return rejectWithValue(error)
        }
    }
)

export const addUserProject = createAsyncThunk(
    "QuanLyProject/addUserProject",
    async(payload,{rejectWithValue})=>{
        try{
            const res = await quanLyProjectServices.assignUserProject(payload)
            
            if(res.data.statusCode === 200){
                toast.success("Bạn đã thêm thành công member")
                
            }
        }catch(error){
            toast.error("Bạn không thể thêm member của Project người khác !")
            return rejectWithValue(error)
        }
    }
)
export const removeUserProject = createAsyncThunk(
    "QuanLYProject/removeUserProject",
    async(payload,{rejectWithValue})=>{
        try{
            const res = await quanLyProjectServices.removeUserProject(payload)
            
            if(res.data.statusCode === 200){
                toast.success("Bạn đã xóa thành công")
                
            }
            return res.data
        }catch(error){
          
                toast.error("Xóa thành viên thất bại ! !")
            
            
            return rejectWithValue(error)
        }
    }
    )

export const getProjectDetail = createAsyncThunk(
    'QuanLyProject/getProjectDetail',
    async(payload,{rejectWithValue}) =>{
        try{
            const res = await quanLyProjectServices.getProjectDetail(payload)

            return res.data.content
        }catch(error){
         
       
            
            return rejectWithValue(error)
        }
    }
)