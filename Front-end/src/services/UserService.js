import instance from './customize-axios'
const fetchAllUser = (check_delete) => {
    return instance.get(`/api/user?check_delete=${check_delete}`);
}
const postUser = (userData) => {
    return instance.post("/api/user", userData);
}
const putUser = async (id, updateData) => {
    try {
        const response = await instance.put(`/api/user?id=${id}`, updateData);
        return response;
    } catch (error) {
        throw error;
    }
}
const restoreUser = async (id) =>{
    try{
        const response=await instance.put(`/api/user/restore?id=${id}`);
        return response;
    }
    catch(error)
    {
        throw error;
    }
}
const deleteUser = async (id) => {
    try {
        const response = await instance.delete(`/api/user?id=${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};


export { fetchAllUser, postUser, putUser, deleteUser ,restoreUser};