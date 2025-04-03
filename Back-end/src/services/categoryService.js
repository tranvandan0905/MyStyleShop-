const Category = require("../models/Category");

const getAllCategories = async () => {
    return await Category.find({});
};

const createCategory = async (name) => {
    return await Category.create({ name });
};

const deleteCategory = async (id) => {
    return await Category.findByIdAndDelete(id);
};

const updateCategory = async (id, updateData) => {
    return await Category.findByIdAndUpdate(id, updateData, { new: true });
};

module.exports = {
    getAllCategories,
    createCategory,
    deleteCategory,
    updateCategory,
};
