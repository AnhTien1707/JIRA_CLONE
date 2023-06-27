import http from "../contant/api"
export const quanLyProjectServices = {
    getAllProjectCategory : () => http.get('ProjectCategory'),
    CreateProject : (payload) => http.post('Project/createProjectAuthorize',payload),
    getAllProject : () => http.get('Project/getAllProject'),
    getProjectDetail : (id) => http.get(`Project/getProjectDetail?id=${id}`),
    UpdateProject : (id,payload) => http.put(`Project/updateProject?projectId=${id}`,payload),
    DeleteProject : (id) => http.delete(`Project/deleteProject?projectId=${id}`),
    assignUserProject: (payload) => http.post('Project/assignUserProject',payload),
    removeUserProject : (payload) => http.post('Project/removeUserFromProject',payload),

}