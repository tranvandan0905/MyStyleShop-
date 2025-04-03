const order = require("../models/Order")
module.exports = {
    getOrders: async (req, res) => {
        try {
            const orders = await order.find({})
                .populate("userId")
                .populate("items.productId");
            return res.status(200).json({
                errorCode: 0,
                data: orders
            });
        } catch (error) {
            console.error("Lỗi chi tiết:", error);
            return res.status(500).json({
                errorCode: 1,
                message: "Lỗi server",
                error: error.message
            });
        }
    }, 
    
    postOrder: async (req, res) => {
        try {
            if (!req.session) {
                return res.status(500).json({ errorCode: 1, message: "Session chưa được khởi tạo" });
            }
            const cart = req.session.cart || [];
            const { paymentMethod, shippingAddress } = req.body;
            const userId = req.user._id;
            if (!userId || cart.length === 0 || !paymentMethod || !shippingAddress) {
                return res.status(400).json({
                    errorCode: 1,
                    message: "Thiếu thông tin đơn hàng"
                });
            }

            const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

            const newOrder = await order.create({
                userId,
                items: cart,
                totalPrice,
                paymentMethod,
                shippingAddress
            });

            req.session.cart = [];

            return res.status(200).json({
                errorCode: 0,
                message: "Đặt hàng thành công",
                data: newOrder
            });
        } catch (error) {
            return res.status(500).json({
                errorCode: 1,
                message: "Lỗi server",
                error: error.message
            });
        }
    },

    deleteOrder: async (req, res) => {
        try {
            const orderID = req.body.id;
            if (!orderID) {
                return res.status(400).json({
                    errorCode: 1,
                    message: "Thiếu ID đơn hàng"
                });
            }

            const result = await order.findByIdAndDelete(orderID);
            if (!result) {
                return res.status(404).json({
                    errorCode: 1,
                    message: "Không tìm thấy đơn hàng"
                });
            }
            return res.status(200).json({
                errorCode: 0,
                data: result
            });
        } catch (error) {
            return res.status(500).json({
                errorCode: 1,
                message: "Lỗi server",
                error: error.message
            });
        }
    }

}