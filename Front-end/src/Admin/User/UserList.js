import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import ModalAddNew from "./UserAddFrom";
import UserEditModal from "./UserEditForm";
import { fetchAllUser, deleteUser, restoreUser } from "../../services/UserService";
const UserList = () => {
  const [listUser, setListUser] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDisabled, setShowDisabled] = useState(false);
  const getUser = async (check_delete) => {
    try {
      let res = await fetchAllUser(check_delete);
      if (res?.data) {
        setListUser(res.data);
        setFilteredUsers(res.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu người dùng:", error);
    }
  };
  useEffect(() => {
    const filtered = listUser.filter((item) =>
      item.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, listUser]); // Lọc khi searchTerm thay đổi hoặc listUser thay đổi
  useEffect(() => {
    getUser();
  }, []);
  // Xử lý hiển thị danh sách user bị vô hiệu hóa
  const handleShowDisabledUsers = async () => {
    await getUser(true); // Gọi API với tham số check_delete = true để lấy danh sách user bị vô hiệu hóa
    setShowDisabled(true);
  };
  //  Hiển thị Modal Add User
  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  //Hiển thị Modal Edit User
  const [showEdit, setShowEdit] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const handleShowEdit = (user) => {
    setCurrentUser(user);
    setShowEdit(true);
  };
  //Cập nhật lại danh sách người dùng
  const handleUpdateTable = async () => {
    await getUser();
    setShowDisabled(false)
  };
  const handleSaveEdit = async (updatedUser) => {
    await getUser();
    setShowEdit(false);
  };
  const handlerestoreUser = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa user này?")) {
      try {
        await deleteUser(id);
        await getUser(true);
      } catch (error) {
        console.error("Lỗi khi xóa người dùng:", error);
      }
    }
  }
  // Xóa user
  const handleDeleteUser = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn bật unlock user này?")) {
      try {
        await restoreUser(id);
        await getUser();
      } catch (error) {
        console.error("Lỗi khi xóa người dùng:", error);
      }
    };
  };
  return (
    <>
      <div className="d-flex justify-content-between">
        {!showDisabled ? (
          <button className='btn btn-warning' onClick={handleShowDisabledUsers}>
            User Disable
          </button>
        ) : (
          <button className='btn btn-secondary' onClick={handleUpdateTable}>
            Close
          </button>
        )}
        <button className='btn btn-success' onClick={() => setShowAdd(true)}>Add User</button>
      </div>
      {/* Ô tìm kiếm */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật searchTerm
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((item, index) => (
              <tr key={item._id}>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>{item.address}</td>
                <td>{item.phone}</td>
                {showDisabled ? (
                  <td>
                    <button className="btn btn-warning mx-2" onClick={() => handlerestoreUser(item._id)} >unlock</button>

                  </td>
                ) : (
                  <td>
                    <button className="btn btn-warning mx-2" onClick={() => handleShowEdit(item)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDeleteUser(item._id)}>Delete</button>
                  </td>
                )}
              </tr>

            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No data available</td>
            </tr>
          )}
        </tbody>
      </Table>

      <ModalAddNew show={showAdd} handleClose={handleCloseAdd} handleUpdateTable={handleUpdateTable} />
      <UserEditModal
        show={showEdit}
        handleClose={() => setShowEdit(false)}
        user={currentUser}
        setUser={setCurrentUser}
        handleSave={handleSaveEdit}
      />
    </>
  );
};

export default UserList;
