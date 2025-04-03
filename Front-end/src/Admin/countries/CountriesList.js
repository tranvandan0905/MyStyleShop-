import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import ModalAddNew from "./CountriesAddForm";
import CountriesEditModal from "./CountriesEditForm";

const CountriesList = () => {
  const [items, setItems] = useState([
    { id: 1, name: "John Doe", createdAt: "2025-03-16" },
    { id: 2, name: "Jane Smith", createdAt: "2025-03-15" },
    { id: 3, name: "Michael Brown", createdAt: "2025-03-14" },
    { id: 4, name: "Sara White", createdAt: "2025-03-13" }
  ]);

  const [totalPages, setTotalPages] = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    getItems(1);
  }, []);

  const getItems = async (page) => {
    try {
      console.log("Fetching items for page", page);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  const handlePageClick = (event) => {
    getItems(+event.selected + 1);
  };

  // 🆕 Đóng modal Add Item
  const handleCloseAdd = () => setShowAdd(false);

  // ✏️ Mở modal Edit Item
  const handleShowEdit = (item) => {
    setCurrentItem(item);
    setShowEdit(true);
  };

  // ✅ Lưu thông tin sau khi chỉnh sửa
  const handleSaveEdit = () => {
    setItems(items.map(i => (i.id === currentItem.id ? currentItem : i)));
    setShowEdit(false);
  };

  // 🗑️ Xóa item
  const handleDeleteItem = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <span><b>Item List</b></span>
        <button className='btn btn-success' onClick={() => setShowAdd(true)}>Add Item</button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.createdAt}</td>
                <td>
                  <button className='btn btn-warning mx-2' onClick={() => handleShowEdit(item)}>Edit</button>
                  <button className='btn btn-danger' onClick={() => handleDeleteItem(item.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">No data available</td>
            </tr>
          )}
        </tbody>
      </Table>

      <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={totalPages}
      previousLabel="< previous"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="active"
      />

      <ModalAddNew show={showAdd} handleClose={handleCloseAdd} />
      <CountriesEditModal
        show={showEdit}
        handleClose={() => setShowEdit(false)}
        item={currentItem}
        setItem={setCurrentItem}
        handleSave={handleSaveEdit}
      />
    </>
  );
};

export default CountriesList;
