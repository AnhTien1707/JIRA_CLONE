
import axios from "axios";
const http = axios.create()
const TokenCyberSoft =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udGVuZCA3NCIsIkhldEhhblN0cmluZyI6IjE2LzA5LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5NDgyMjQwMDAwMCIsIm5iZiI6MTY2ODI3MjQwMCwiZXhwIjoxNjk0OTcwMDAwfQ.3TXoqM7cOKUQgRGc0plbpUsV406snlZBBeHlA7RxJYk";
const baseURL = "https://jiranew.cybersoft.edu.vn/api/";
let token = ""
export const checkToken = () => {
   if(JSON.parse(localStorage.getItem('user') === null)){
      token = ""
   }else{
      token = `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`
   }
   return token
}
http.interceptors.request.use((config)=>{
  return {
    ...config,
    headers:{
      TokenCyberSoft,
      Authorization: checkToken(),
    },
    baseURL,
  }
})
export default http;