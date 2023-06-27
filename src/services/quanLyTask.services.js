import http from "../contant/api"
export const quanLyTaskServices = {
    getAllStatus : () => http.get('Status/getAll'),
    getAllTaskType : ()=> http.get('TaskType/getAll'),
    getAllPriority : () => http.get('Priority/getAll'),
    createTask : (payload) => http.post('Project/createTask',payload),
    getUserTask : (idProject) => http.get(`Users/getUserByProjectId?idProject=${idProject}`),
    removeUserTask : (payload) => http.post('Project/removeUserFromTask',payload),
    getTaskDetail : (idTask) => http.get(`Project/getTaskDetail?taskId=${idTask}`),
    updateStatusTask : (payload) => http.put('Project/updateStatus',payload),
    updateTask : (payload) => http.post('Project/updateTask',payload),
    postCommentTask : (payload) => http.post("Comment/insertComment",payload),
    deleteCommentTask : (payload) => http.delete(`Comment/deleteComment?idComment=${payload}`),
    deleteTask : (taskid) => http.delete(`Project/removeTask?taskId=${taskid}`)
}