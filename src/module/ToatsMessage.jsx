import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const ToatsMessage = () => {
    const ToatsMessgeClone = {
        error : (message) => toast(message , {type:"error"}),
        succes : (message) => toast(message, {type:"success"}),

    };
    Object.assign(message,ToatsMessgeClone);
  return (
    <div><ToastContainer/></div>
  )
}
export const message = {};

