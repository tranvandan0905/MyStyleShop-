const { loginUser, registerUser } = require("../services/AuthServices");

const loginPages = async (req, res) => {
    const { username, password } = req.body;
    const result = await loginUser(username, password);

    if (result.error) {
        return res.status(result.status).json({ message: result.message });
    }
    res.cookie("token", result.token, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000, 
    });

    res.json({ message: "Đăng nhập thành công!", role: result.user.role, token: result.token });
};

const SignupPages = async (req, res) => {
    const result = await registerUser(req.body);

    if (result.error) {
        return res.status(result.status).json({ message: result.message });
    }

    res.status(201).json({ message: result.message, userId: result.userId });
};

const logout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Đăng xuất thành công!" });
};

module.exports = { loginPages, SignupPages, logout };
