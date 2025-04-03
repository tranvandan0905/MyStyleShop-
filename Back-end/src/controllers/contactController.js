const contactService = require('../services/ContactServices');

module.exports = {
    Getcontact: async (req, res) => {
        try {
            const contacts = await contactService.getContacts();
            res.status(200).json({
                errorCode: 0,
                message: 'Lấy tất cả tin nhắn liên hệ thành công',
                data: contacts
            });
        } catch (error) {
            res.status(500).json({
                errorCode: 1,
                message: 'Lỗi khi lấy dữ liệu liên hệ',
                error: error.message
            });
        }
    },

    Postcontact: async (req, res) => {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            return res.status(400).json({ message: 'Thiếu thông tin!' });
        }

        try {
            const newContact = await contactService.createContact(name, email, phone, message);
            res.status(201).json({
                errorCode: 0,
                message: 'Tin nhắn đã được gửi thành công!',
                data: newContact
            });
        } catch (error) {
            res.status(500).json({
                errorCode: 1,
                message: 'Đã có lỗi xảy ra khi lưu tin nhắn!',
                error: error.message
            });
        }
    },

    deletecontact: async (req, res) => {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Thiếu thông tin ID để xóa!' });
        }

        try {
            const contact = await contactService.deleteContact(id);
            res.status(200).json({
                errorCode: 0,
                message: 'Đã xóa liên hệ thành công!',
                data: contact
            });
        } catch (error) {
            res.status(500).json({
                errorCode: 1,
                message: 'Đã có lỗi xảy ra khi xóa liên hệ!',
                error: error.message
            });
        }
    }
};
