const { updateCartSession, getCartSession, removeCartItem } = require("../services/cartServices");

const postCart = (req, res) => {
    if (!req.session) {
        return res.status(500).json({ errorCode: 1, message: "Session chưa được khởi tạo" });
    }

    const body = Object.keys(req.body).reduce((acc, key) => {
        acc[key.trim()] = req.body[key];
        return acc;
    }, {});

    const { productId, quantity, price, name, image } = body;

    const updatedCart = updateCartSession(req.session, productId, name, image, quantity, price);

    return res.status(200).json({ errorCode: 0, message: "Thêm vào giỏ hàng thành công", cart: updatedCart });
};

const getCart = (req, res) => {
    if (!req.session) {
        return res.status(500).json({ errorCode: 1, message: "Session chưa được khởi tạo" });
    }

    const cart = getCartSession(req.session);
    return res.json({ errorCode: 0, cart });
};

const deleteCart = (req, res) => {
    if (!req.session) {
        return res.status(500).json({ errorCode: 1, message: "Session chưa được khởi tạo" });
    }

    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ errorCode: 1, message: "Thiếu productId" });
    }

    const updatedCart = removeCartItem(req.session, id);
    if (updatedCart.error) {
        return res.status(400).json({ errorCode: 1, message: updatedCart.message });
    }

    return res.json({ errorCode: 0, message: "Đã cập nhật giỏ hàng", cart: updatedCart });
};

module.exports = { postCart, getCart, deleteCart };
