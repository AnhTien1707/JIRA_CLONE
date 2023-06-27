import { configureStore } from "@reduxjs/toolkit";
import { QuanlyUserReducer } from "./QuanlyUser/slice";
import { QuanLyProjectReducer } from "./QuanLyProject/slice";
import { QuanLyModalReducer } from "./QuanLyModal/slice";
import { QuanLyTaskReducer } from "./QuanLyTask/slice";

export const store = configureStore({
    reducer:{
        QuanlyUser : QuanlyUserReducer,
        QuanLyProject : QuanLyProjectReducer,
        QuanLyModal : QuanLyModalReducer,
        QuanLyTask : QuanLyTaskReducer,
    }
});