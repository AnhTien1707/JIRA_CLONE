import React from 'react'
import { useSelector } from 'react-redux';

const Loading = () => {
    const {isLoading} = useSelector((state)=>state.QuanLyProject)
   if(isLoading){
    return (
        <div style={{
            position:'fixed',
            top:'0',
            bottom :'0',
            height:"100%",
            width:"100%",
            background:"rgb(0,0,0,0.8)",
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
        }}>
            <img src={require('../../assets/img/loading.gif')}alt="" />
        </div>
      )
   }

}

export default Loading