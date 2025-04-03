import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postLogout } from "../services/AuthService";

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                await postLogout(); // Gọi API logout

                // Xóa dữ liệu trên client
                localStorage.removeItem("token");
                localStorage.removeItem("role");

                // Chuyển về trang đăng nhập
                navigate("/login");
                window.location.reload();
            } catch (error) {
                console.error("Lỗi đăng xuất:", error);
            }
        };

        handleLogout(); // Gọi hàm ngay khi component render
    }, [navigate]);

    return null; // Không hiển thị gì cả
}

export default Logout;
