const mongoose = require("mongoose");
const mongoose_delete = require('mongoose-delete');
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    phone: { type: String, unique: true, sparse: true },
    address: { type: String },
    role: { type: String, enum: ["customer", "admin"], default: "customer" }
}, { timestamps: true });
userSchema.plugin(mongoose_delete, {
    overrideMethods: "all",
    deletedAt: true,
    deletedBy: true
});
module.exports = mongoose.model("User", userSchema);
