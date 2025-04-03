const Product = require('../models/Product');
const Category = require('../models/Category');
const { uploadToCloudinary, deleteFromCloudinary } = require("../config/cloudinaryService");

module.exports = {
    postProduct: async (req, res) => {
        try {


            if (!req.files || !req.files.images) {
                return res.status(400).json({ errorCode: 1, message: "Không có ảnh được tải lên!" });
            }
            const imageUrls = await Promise.all(
                req.files.images.map(file => uploadToCloudinary(file.buffer))
            );
            const product = await Product.create({
                ...req.body,
                images: imageUrls.map(img => img.secure_url)
            });

            return res.status(201).json({ errorCode: 0, data: product });
        } catch (error) {
            return res.status(400).json({ errorCode: 1, message: "Lỗi khi tạo sản phẩm!", error: error.message });
        }
    },

    getProduct: async (req, res) => {
        try {
            const { page = 1, limit = 10 } = req.query;
            const skip = (page - 1) * limit;

            const products = await Product.find().populate("category")

                .skip(skip)
                .limit(Number(limit));

            const total = await Product.countDocuments();

            return res.status(200).json({
                errorCode: 0,
                data: products,
                total,
                page: Number(page),
                totalPages: Math.ceil(total / limit),
            });
        } catch (error) {
            return res.status(500).json({ errorCode: 2, message: "Lỗi server khi lấy danh sách sản phẩm!", error: error.message });
        }
    },


    deleteProduct: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ errorCode: 1, message: "Thiếu ID sản phẩm!" });
            }
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ errorCode: 1, message: "Không tìm thấy sản phẩm!" });
            }
            await Promise.all(product.images.map(imgUrl => deleteFromCloudinary(imgUrl)));
            await Product.findByIdAndDelete(id);

            return res.status(200).json({ errorCode: 0, message: "Xóa sản phẩm thành công!" });
        } catch (error) {
            return res.status(500).json({ errorCode: 2, message: "Lỗi server khi xóa sản phẩm!", error: error.message });
        }
    },

    searchProduct: async (req, res) => {
        try {
            const { name } = req.query;
            if (!name) {
                return res.status(400).json({ errorCode: 1, message: "Vui lòng nhập tên sản phẩm!" });
            }
            const products = await Product.find({ name: { $regex: name, $options: "i" } });

            return res.status(200).json({ errorCode: 0, data: products });
        } catch (error) {
            return res.status(500).json({ errorCode: 2, message: "Lỗi server khi tìm kiếm sản phẩm!", error: error.message });
        }
    },

    putProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const updateData = req.body;
            if (!id) {
                return res.status(400).json({ errorCode: 1, message: "Thiếu ID sản phẩm!" });
            }
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ errorCode: 1, message: "Không tìm thấy sản phẩm!" });
            }

            if (req.files && req.files.images) {
                await Promise.all(product.images.map(imgUrl => deleteFromCloudinary(imgUrl)));

                const imageUrls = await Promise.all(
                    req.files.images.map(file => uploadToCloudinary(file.buffer))
                );

                product.images = imageUrls.map(img => img.secure_url);
                await product.save();
            }
            const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
            return res.status(200).json({
                errorCode: 0,
                message: "Cập nhật sản phẩm thành công!",
                data: updatedProduct,
            });
        } catch (error) {
            return res.status(500).json({
                errorCode: 2,
                message: "Lỗi server khi cập nhật sản phẩm!",
                error: error.message,
            });
        }
    },
    filterProducts: async (req, res) => {
        try {
            const { page = 1, limit = 10, gender } = req.query;
            const skip = (Number(page) - 1) * Number(limit);
            let filter = {};
            if (gender == "Nam" || gender == "Nữ") {
                filter.gender = new RegExp(`^${gender}$`, "i");
            }
            else if (gender == "Khuyến mãi") {
                filter.discount = { $gt: 0 };
            }
            else {
                const categoryData = await Category.findOne({ name: gender });
                if (!categoryData) {
                    return res.status(404).json({ errorCode: 1, message: "Danh mục không tồn tại!" });
                }
                filter.category = categoryData._id;
            }
            const total = await Product.countDocuments(filter);
            const products = await Product.find(filter)
                .skip(skip)
                .limit(Number(limit));
            return res.status(200).json({
                errorCode: 0,
                data: products,
                page: Number(page),
                totalPages: Math.ceil(total / limit),
                totalItems: total,
            });
        } catch (error) {
            return res.status(500).json({
                errorCode: 2,
                message: "Lỗi server khi lọc sản phẩm!",
                error: error.message
            });
        }

    }


};
