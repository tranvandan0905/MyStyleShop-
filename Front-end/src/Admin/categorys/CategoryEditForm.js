import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import { putCategory } from "../../services/CategoryService";

const CategoryEditForm = ({ show, handleClose, Category, handleUpdateTable }) => {
  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    if (Category) {
      setFormData({
        name: Category.name,
      });
    }
  }, [Category]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    const { name } = formData;
    if (!name) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      const response = await putCategory(Category._id, { name });
      if (response?.data) {
        toast.success("Category updated successfully!");
        handleUpdateTable(response.data); // Cập nhật danh sách sau khi chỉnh sửa
        handleClose(); // Đóng modal
      } else {
        toast.error("Failed to update Category.");
      }
    } catch (error) {
      toast.error("Error while updating Category!");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {Category && (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        )}
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

export default CategoryEditForm;
