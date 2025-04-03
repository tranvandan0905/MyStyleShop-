import instance from './customize-axios'
const fetchAllProduct = () => {
    return instance.get(`/api/product`);
}
const postProduct = (userData) => {
    return instance.post("/api/product", userData);
}
const putProduct = async (id, updateData) => {
    try {
        const response = await instance.put(`/api/product/${id}`, updateData);
        return response;
    } catch (error) {
        throw error;
    }
};
const deleteProduct = async (id) => {
    try {
        const response = await instance.delete(`/api/product/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};
const filterProduct = async (params) => {
    try {
        const response = await instance.get("/api/product/filter", { params });
        return response;
    } catch (error) {
        throw error;
    }
};


export { fetchAllProduct, postProduct, putProduct, filterProduct,deleteProduct };