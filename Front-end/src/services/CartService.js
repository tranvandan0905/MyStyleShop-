
import instance from './customize-axios';
const postCart = (Data) => {
    return instance.post("/api/cart", Data, { withCredentials: true }); 
};

const getCart = async () => {
    try {
        const res = await instance.get("/api/cart", { withCredentials: true });
        if (!res) {
            console.error("Lỗi: `res.data` không tồn tại!");
        }

        return res; 
    } catch (error) {
        console.error("Lỗi khi gọi API `/api/cart`:", error);
        return null;
    }
};
const deleteCart = (id) => {
    return instance.delete(`/api/cart/${id}`, { withCredentials: true }); 
};



export { postCart, getCart, deleteCart };
