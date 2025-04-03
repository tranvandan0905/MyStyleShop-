import { Modal, Button } from "react-bootstrap";
import { useState } from 'react';
import { toast } from 'react-toastify';
import { postUser } from "../../services/UserService";

const UserAddForm = ({ show, handleClose, handleUpdateTable }) => {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        role: "customer",
        address: "",
        phone: "",
        passwordHash: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSave = async () => {
        const { username, email, role, address, phone, passwordHash } = userData;
        // Kiểm tra các trường bắt buộc
        if (!username || !email || !role || !address || !phone || !passwordHash) {
            toast.error("Please fill in all fields!");
            return;
        }
        try {
            const response = await postUser(userData); 
            if (response?.data) {
                toast.success("User added successfully!");
                handleUpdateTable(response.data); 
                handleClose();
                resetForm();
            } else {
                toast.error("Failed to add user.");
            }
        } catch (error) {
            toast.error("Error while adding user!");
        }
    };

    const resetForm = () => {
        setUserData({
            username: "",
            email: "",
            role: "customer",
            address: "",
            phone: "",
            passwordHash: ""
        });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    {["username", "email", "address", "phone", "passwordHash"].map((field, idx) => (
                        <div className="mb-3" key={idx}>
                            <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                            <input
                                type={field === "passwordHash" ? "password" : "text"}
                                className="form-control"
                                name={field}
                                value={userData[field]}
                                onChange={handleInputChange}
                            />
                        </div>
                    ))}
                    <div className="mb-3">
                        <label className="form-label">Role</label>
                        <select
                            className="form-control"
                            name="role"
                            value={userData.role}
                            onChange={handleInputChange}
                        >
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSave}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserAddForm;
