import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { postCategory } from "../../services/CategoryService";

const CategoryAddForm = ({ show, handleClose, handleUpdateTable }) => {
  const [name, setCategoryname] = useState("");

  const handleSave = async () => {
    if (!name) {
      toast.error("Please fill in all fields!");
      return;
    }
    try {
      const response = await postCategory({ name }); 
      if (response?.data) {
        toast.success("Category added successfully!");
        handleUpdateTable(response.data); 
        handleCloseModal(); 
      } else {
        toast.error("Failed to add category.");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Error while adding category!");
    }
  };

  const resetForm = () => {
    setCategoryname("");


  };

  const handleCloseModal = () => {
    resetForm();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <form>
          <div className="mb-3">
            <label className="form-label">Category Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setCategoryname(e.target.value)}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Category
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoryAddForm;
