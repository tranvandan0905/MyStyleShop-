const mongoose = require("mongoose");
const mongoose_delete = require('mongoose-delete');
const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    totalPrice: { type: Number, required: true },
    status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "canceled"],
        default: "pending"
    },
    paymentMethod: { type: String, enum: ["COD", "Credit Card", "Momo", "ZaloPay"], default: "COD" },
    shippingAddress: { type: String },
}, { timestamps: true });
orderSchema.plugin(mongoose_delete, { overrideMethods: "all" });
module.exports = mongoose.model("Order", orderSchema);
