const userService = require('../services/userService');

module.exports = {
    postUser: async (req, res) => {
        try {
            const { username, email, password, phone, address, role } = req.body;

   
            if (!username || !email || !password) {
                return res.status(400).json({
                    errorCode: 1,
                    message: "Vui lòng nhập đầy đủ thông tin!"
                });
            }

            const user = await userService.createUser(username, email, password, phone, address, role);
            return res.status(201).json({
                errorCode: 0,
                data: user,
                message: "Thêm user thành công!"
            });

        } catch (error) {
            console.error("Lỗi khi tạo user:", error);
            return res.status(500).json({
                errorCode: 2,
                message: "Lỗi server!",
                error: error.message
            });
        }
    },

    getUser: async (req, res) => {
        try {
            const { check_delete } = req.query;
            const users = await userService.getUsers(check_delete);
            return res.status(200).json({
                errorCode: 0,
                data: users
            });
        } catch (error) {
            return res.status(500).json({
                errorCode: 1,
                message: "Lỗi! " + error.message
            });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const userId = req.query.id;
            if (!userId) {
                return res.status(400).json({
                    errorCode: 1,
                    message: "Thiếu ID user!"
                });
            }
            const result = await userService.deleteUser(userId);
            return res.status(200).json({
                errorCode: 0,
                data: result,
                message: "Xóa user thành công!"
            });
        } catch (error) {
            return res.status(500).json({
                errorCode: 2,
                message: "Lỗi khi xóa user!",
                error: error.message
            });
        }
    },

    restoreUser: async (req, res) => {
        try {
            const userId = req.query.id;
            if (!userId) {
                return res.status(400).json({
                    errorCode: 1,
                    message: "Thiếu ID user!"
                });
            }
            await userService.restoreUser(userId);
            return res.status(200).json({
                errorCode: 0,
                message: "Khôi phục user thành công!"
            });
        } catch (error) {
            return res.status(500).json({
                errorCode: 2,
                message: "Lỗi khi khôi phục user!",
                error: error.message
            });
        }
    },

    searchUser: async (req, res) => {
        try {
            const { username } = req.body;
            if (!username) {
                return res.status(400).json({
                    errorCode: 1,
                    message: "Vui lòng nhập username!"
                });
            }
            const users = await userService.searchUser(username);
            return res.status(200).json({
                errorCode: 0,
                data: users
            });
        } catch (error) {
            return res.status(500).json({
                errorCode: 2,
                message: "Lỗi khi tìm kiếm user!",
                error: error.message
            });
        }
    },

    putUser: async (req, res) => {
        try {
            const { id } = req.query;
            const updateData = req.body;

            if (!id) {
                return res.status(400).json({ errorCode: 1, message: "Thiếu ID của user!" });
            }

            const result = await userService.updateUser(id, updateData);
            return res.status(200).json({
                errorCode: 0,
                message: "Cập nhật thành công!",
                data: result
            });
        } catch (error) {
            return res.status(500).json({
                errorCode: 2,
                message: "Lỗi khi cập nhật user!",
                error: error.message
            });
        }
    }
};
