import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { putUser } from "../../services/UserService";

const UserEditModal = ({ show, handleClose, user, handleSave }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "customer",
    totalCoins: 0,
    address: "",
    phone: "",
    passwordHash: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        role: user.role,

        address: user.address || "",
        phone: user.phone || "",
        passwordHash: user.passwordHash || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    const { username, email, role, address, phone, passwordHash } = formData;
    if (!username || !email || !role) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      const response = await putUser(user._id, { username, email, role, address, phone, passwordHash });
      if (response?.data) {
        toast.success("User updated successfully!");
        handleSave(response.data); // Cập nhật danh sách sau khi chỉnh sửa
        handleClose(); // Đóng modal
      } else {
        toast.error("Failed to update user.");
      }
    } catch (error) {
      toast.error("Error while updating user!");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
            >
              <option value="Admin">Admin</option>
              <option value="customer">customer</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password Hash</Form.Label>
            <Form.Control
              type="text"
              name="passwordHash"
              value={formData.passwordHash}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserEditModal;
