const mongoose = require("mongoose");
const mongoose_delete = require('mongoose-delete');
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: String,
}, { timestamps: true });
categorySchema.plugin(mongoose_delete, {
    overrideMethods: "all",  
    deletedAt: true,        
    deletedBy: true         
});
module.exports = mongoose.model("Category", categorySchema);
