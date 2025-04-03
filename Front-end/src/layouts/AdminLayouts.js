import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import HeaderAdmin from '../components/HeaderAdmin';
import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
function AdminLayouts() {
  return (
    <>

      <HeaderAdmin />
      <Container>

        <Outlet /> {}

      </Container>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default AdminLayouts;
