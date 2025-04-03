const mongoose = require("mongoose");
const mongoose_delete = require('mongoose-delete');
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String },
    description: String,
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 }, // Phần trăm giảm giá (VD: 10%)
    stock: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    images: [String],
    gender: {
        type: String,
        enum: ["Nam", "Nữ", "Trẻ em", "Unisex"],
        required: true
    },


}, { timestamps: true });
productSchema.plugin(mongoose_delete, {
    overrideMethods: "all",
    deletedAt: true,
    deletedBy: true
});
module.exports = mongoose.model("Product", productSchema);
