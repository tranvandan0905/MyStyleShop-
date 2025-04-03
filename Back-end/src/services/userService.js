const bcrypt = require("bcryptjs");
const user = require('../models/User');

module.exports = {
    createUser: async (username, email, password, phone, address, role) => {
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            return await user.create({
                username,
                email,
                passwordHash: hashedPassword,
                phone,
                address,
                role
            });
        } catch (error) {
            throw new Error("Lỗi khi tạo user: " + error.message);
        }
    },
    getUsers: async (check_delete) => {
        try {
            if (check_delete === "true") {
                return await user.findDeleted({});
            } else {
                return await user.find({ deleted: false });
            }
        } catch (error) {
            throw new Error("Lỗi khi lấy danh sách user: " + error.message);
        }
    },
    deleteUser: async (userId) => {
        try {
            const deletedUser = await user.findById({ _id: userId });
            if (!deletedUser) {
                throw new Error("Không tìm thấy user để xóa!");
            }
            return await user.deleteById(userId);
        } catch (error) {
            throw new Error("Lỗi khi xóa user: " + error.message);
        }
    },
    restoreUser: async (userId) => {
        try {
            const deletedUser = await user.findOneDeleted({ _id: userId });
            if (!deletedUser) {
                throw new Error("Không tìm thấy user để khôi phục!");
            }
            await user.restore({ _id: userId });
        } catch (error) {
            throw new Error("Lỗi khi khôi phục user: " + error.message);
        }
    },
    searchUser: async (username) => {
        try {
            return await user.findWithDeleted({
                username: { $regex: username, $options: "i" }
            });
        } catch (error) {
            throw new Error("Lỗi khi tìm kiếm user: " + error.message);
        }
    },
    updateUser: async (userId, updateData) => {
        try {
            const User = await user.findById(userId);
            if (!User) {
                throw new Error("Không tìm thấy user để cập nhật!");
            }
            return await user.findByIdAndUpdate(userId, updateData, { new: true });
        } catch (error) {
            throw new Error("Lỗi khi cập nhật user: " + error.message);
        }
    }
};
