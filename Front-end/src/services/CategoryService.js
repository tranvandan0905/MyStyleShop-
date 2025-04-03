import instance from "./customize-axios";

const fetchAllCategory = async () => {
    return await instance.get(`/api/category`);
};

const deleteCategory = async (id) => {
    try {
        const response = await instance.delete(`/api/category?id=${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};
const postCategory = async (name) => {
    try {
        const response = await instance.post(`/api/category`, name);
        return response;

    } catch (error) {
        throw error;
    }
};
const putCategory = async (id, updateData) => {
    try {
        const response = await instance.put(`/api/category?id=${id}`, updateData);
        return response;
    } catch (error) {
        throw error;
    }
}
export { fetchAllCategory, deleteCategory, postCategory, putCategory };
