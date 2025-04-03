import instance from './customize-axios';

const postOrder = (userData) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token không tồn tại!");
    }

    return instance.post('/api/order', userData, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        withCredentials: true

    });
};

export { postOrder };
