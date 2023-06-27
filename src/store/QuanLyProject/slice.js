import { createSlice } from "@reduxjs/toolkit";
import {
  AllProject,
  CreateProject,
  GetInfoProject,
  ProjectCategory,
  UpdateProject,
  getProjectDetail,
} from "./thunkAction";
const initialState = {
  ArrProjectCategory: [],
  ArrProjectManagement: [],
  InfoProject: 
  {
    projectName: "string",
    description: "string",
    categoryId: "string",
    alias: "string",
  },
  ArrProjectDetail : [],
  isLoading : false,
  
};

export const { reducer: QuanLyProjectReducer, actions: QuanLyProjectAction } =
  createSlice({
    name: "QuanLyProject",
    initialState,
    reducer: {
      displayLoading : (state)=>{
        state.isLoading = true
      },
      hiddenLoading: (state) =>{
        state.isLoading = false
      }
    },
    extraReducers: (buider) => {
      buider.addCase(ProjectCategory.fulfilled, (state, action) => {
        state.ArrProjectCategory = action.payload;
      });
      buider.addCase(CreateProject.pending, (state, action) => {
        state.isLoading = true;
      });
      buider.addCase(AllProject.fulfilled, (state, action) => {
        state.ArrProjectManagement = action.payload;
        state.isLoading = false;
      });
      buider.addCase(AllProject.pending, (state, action) => {
        state.isLoading = true;
      });
      buider.addCase(GetInfoProject.fulfilled, (state, action) => {
        state.InfoProject = action.payload;
        state.isLoading = false;
      });
      buider.addCase(GetInfoProject.pending, (state, action) => {
        state.isLoading = true;
      });
      buider.addCase(UpdateProject.fulfilled, (state, action) => {
        state.isLoading = true;
      });
      buider.addCase(UpdateProject.pending, (state, action) => {
        state.isLoading = false;
        
      });
      buider.addCase(getProjectDetail.fulfilled,(state,action)=>{
        state.ArrProjectDetail = action.payload
      })
    },
  });
