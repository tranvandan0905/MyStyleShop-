const Contact = require('../models/contact');

module.exports = {
    getContacts: async () => {
        try {
            return await Contact.find();
        } catch (error) {
            throw new Error("Lỗi khi lấy dữ liệu liên hệ: " + error.message);
        }
    },
    createContact: async (name, email, phone, message) => {
        try {
            return await Contact.create({ name, email, phone, message });
        } catch (error) {
            throw new Error("Lỗi khi lưu tin nhắn: " + error.message);
        }
    },
    deleteContact: async (id) => {
        try {
            const contact = await Contact.findByIdAndDelete(id);
            if (!contact) {
                throw new Error("Liên hệ không tồn tại!");
            }
            return contact;
        } catch (error) {
            throw new Error("Lỗi khi xóa liên hệ: " + error.message);
        }
    }
};
