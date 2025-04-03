const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const loginUser = async (username, password) => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return { error: true, status: 400, message: "User không tồn tại!" };
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return { error: true, status: 400, message: "Sai mật khẩu!" };
        }

        if (!process.env.JWT_SECRET) {
            return { error: true, status: 500, message: "Lỗi cấu hình server: JWT_SECRET bị thiếu!" };
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return { error: false, token, user };
    } catch (error) {
        return { error: true, status: 500, message: "Lỗi server", details: error.message };
    }
};

const registerUser = async (userData) => {
    try {
        const { username, email, password, phone, address } = userData;

        if (!username || !email || !password) {
            return { error: true, status: 400, message: "⚠️ Vui lòng nhập đầy đủ thông tin!" };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { error: true, status: 400, message: "Email không hợp lệ!" };
        }

        const phoneRegex = /^[0-9]{10,15}$/;
        if (phone && !phoneRegex.test(phone)) {
            return { error: true, status: 400, message: "Số điện thoại không hợp lệ! Phải có từ 10-15 chữ số." };
        }

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return { error: true, status: 400, message: "Email hoặc Username đã tồn tại!" };
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            passwordHash,
            phone,
            address,
            role: "customer",
        });

        await newUser.save();
        return { error: false, message: "Đăng ký thành công!", userId: newUser._id };
    } catch (error) {
        return { error: true, status: 500, message: "Lỗi server!", details: error.message };
    }
};

module.exports = { loginUser, registerUser };
