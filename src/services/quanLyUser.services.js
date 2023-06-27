import http from "../contant/api"
export const quanLyUserService = {
    login : (payload) => http.post('Users/signin' , payload),
    // payload : {user : , password :}
    register : (payload) => http.post('Users/signup' , payload),
    getUser : (keyword) => http.get(`Users/getUser?keyword=${keyword}`),
    EditUser : (payload) => http.put("Users/editUser",payload)
}