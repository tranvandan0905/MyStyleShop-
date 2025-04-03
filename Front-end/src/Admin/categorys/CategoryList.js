
import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import CategoryEditModal from "./CategoryEditForm";
import ModalAddNew from "./CategoryAddForm";
import { fetchAllCategory, deleteCategory } from "../../services/CategoryService"

const CategoryList = () => {
  const [listCategory, setlistCategory] = useState([]);
  const getCategory = async () => {
    const res = await fetchAllCategory();
    if (res?.data) {
      setlistCategory(res.data);
    }
  }
  useEffect(() => {
    getCategory();
  }, []);
  const handdeleteCategory = async (id) => {
    if (window.confirm("Ban co muon xoa Category nay?")) {
      try {
        await deleteCategory(id);
        await getCategory();
      } catch (error) {
        console.error("Lỗi khi xóa người dùng:", error);
      }
    }
  }
  const handleUpdateTable = async () => {
    await getCategory();
  };
  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => {
    setShowAdd(false);
  };
  const [showedit, setShowedit] = useState(false);
  const handleCloseedit = () => {
    setShowedit(false);
  };
  const [showCategory, setedit] = useState([]);
  const handleShowEdit = (user) => {
    setedit(user);
    setShowedit(true)
  };
  return (
    <>
      <div className="d-flex justify-content-between">
        <button className='btn btn-success' onClick={() => setShowAdd(true)}>Add category</button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listCategory.length > 0 ? (
            listCategory.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>
                  <button className="btn btn-warning mx-2" onClick={() => handleShowEdit(item)}  >Edit</button>
                  <button className="btn btn-danger" onClick={() => handdeleteCategory(item._id)}>Delete</button>
                </td>
              </tr>

            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No data available</td>
            </tr>
          )}
        </tbody>
      </Table>
      <ModalAddNew
        show={showAdd}
        handleClose={handleCloseAdd}
        handleUpdateTable={handleUpdateTable} />
      <CategoryEditModal
        show={showedit}
        Category={showCategory}
        handleClose={handleCloseedit}
        handleUpdateTable={handleUpdateTable} />
    </>
  )


};

export default CategoryList;
