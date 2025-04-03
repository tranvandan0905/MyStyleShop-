const jwt = require("jsonwebtoken");
const User = require("../models/User"); 

const authenticateToken = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers["authorization"]?.split(" ")[1];
        
        if (!token) {
            return res.status(403).json({ message: "Không có token xác thực!" });
        }
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Token không hợp lệ!" });
            }
            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(404).json({ message: "Người dùng không tồn tại!" });
            }
            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};
module.exports={authenticateToken};