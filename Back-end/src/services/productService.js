const Product = require("../models/Product");
const Category = require("../models/Category");
const { uploadToCloudinary, deleteFromCloudinary } = require("../config/cloudinaryService");

const createProduct = async (data, files) => {
    if (!files || !files.images) {
        throw new Error("Không có ảnh được tải lên!");
    }
    const imageUrls = await Promise.all(files.images.map(file => uploadToCloudinary(file.buffer)));
    return await Product.create({
        ...data,
        images: imageUrls.map(img => img.secure_url),
    });
};

const getProducts = async (page, limit) => {
    const skip = (page - 1) * limit;
    const products = await Product.find().populate("category").skip(skip).limit(Number(limit));
    const total = await Product.countDocuments();
    return { products, total, totalPages: Math.ceil(total / limit) };
};

const getProductById = async (id) => {
    return await Product.findById(id);
};

const deleteProduct = async (id) => {
    const product = await Product.findById(id);
    if (!product) throw new Error("Không tìm thấy sản phẩm!");

    await Promise.all(product.images.map(imgUrl => deleteFromCloudinary(imgUrl)));
    await Product.findByIdAndDelete(id);
    return product;
};

const searchProductByName = async (name) => {
    return await Product.find({ name: { $regex: name, $options: "i" } });
};

const updateProduct = async (id, updateData, files) => {
    const product = await Product.findById(id);
    if (!product) throw new Error("Không tìm thấy sản phẩm!");

    if (files && files.images) {
        await Promise.all(product.images.map(imgUrl => deleteFromCloudinary(imgUrl)));

        const imageUrls = await Promise.all(files.images.map(file => uploadToCloudinary(file.buffer)));
        product.images = imageUrls.map(img => img.secure_url);
        await product.save();
    }
    
    return await Product.findByIdAndUpdate(id, updateData, { new: true });
};

const filterProducts = async (page, limit, gender) => {
    const skip = (Number(page) - 1) * Number(limit);
    let filter = {};

    if (gender === "Nam" || gender === "Nữ") {
        filter.gender = new RegExp(`^${gender}$`, "i");
    } else if (gender === "Khuyến mãi") {
        filter.discount = { $gt: 0 };
    } else {
        const categoryData = await Category.findOne({ name: gender });
        if (!categoryData) throw new Error("Danh mục không tồn tại!");
        filter.category = categoryData._id;
    }

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter).skip(skip).limit(Number(limit));
    return { products, total, totalPages: Math.ceil(total / limit) };
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    deleteProduct,
    searchProductByName,
    updateProduct,
    filterProducts,
};
