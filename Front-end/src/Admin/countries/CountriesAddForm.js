import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { toast } from 'react-toastify';

const CountriesAddForm = ({ show, handleClose, handleUpdateTable }) => {
  const [name, setName] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const handleSave = () => {
    if (!name || !createdAt) {
      toast.error("Please fill all fields!");
      return;
    }

    const newItem = {
      name,
      createdAt
    };

    handleUpdateTable(newItem);
    toast.success("Item added successfully!");

    // Reset form
    setName("");
    setCreatedAt("");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Created At</label>
            <input
              type="date"
              className="form-control"
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Item
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CountriesAddForm;

