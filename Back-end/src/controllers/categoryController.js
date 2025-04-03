const categoryService = require("../services/categoryService");

const getCategory = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json({ errorCode: 0, data: categories });
    } catch (error) {
        res.status(500).json({ errorCode: 1, message: "Lỗi server!", error: error.message });
    }
};

const postCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ errorCode: 1, message: "Thiếu tên danh mục!" });
        }
        const newCategory = await categoryService.createCategory(name);
        res.status(201).json({ errorCode: 0, data: newCategory });
    } catch (error) {
        res.status(500).json({ errorCode: 1, message: "Lỗi server!", error: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ errorCode: 1, message: "Thiếu ID danh mục!" });
        }
        const deletedCategory = await categoryService.deleteCategory(id);
        if (!deletedCategory) {
            return res.status(404).json({ errorCode: 1, message: "Không tìm thấy danh mục!" });
        }
        res.status(200).json({ errorCode: 0, message: "Xóa danh mục thành công!", data: deletedCategory });
    } catch (error) {
        res.status(500).json({ errorCode: 1, message: "Lỗi server!", error: error.message });
    }
};

const putCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (!id) {
            return res.status(400).json({ errorCode: 1, message: "Thiếu ID danh mục!" });
        }
        
        const updatedCategory = await categoryService.updateCategory(id, updateData);
        if (!updatedCategory) {
            return res.status(404).json({ errorCode: 1, message: "Không tìm thấy danh mục!" });
        }

        res.status(200).json({ errorCode: 0, message: "Cập nhật thành công!", data: updatedCategory });
    } catch (error) {
        res.status(500).json({ errorCode: 1, message: "Lỗi server!", error: error.message });
    }
};

module.exports = {
    getCategory,
    postCategory,
    deleteCategory,
    putCategory,
};
