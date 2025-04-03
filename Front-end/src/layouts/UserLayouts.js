import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import HeaderUser from '../components/HeaderUser';
import { Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Footer } from '../components/Footer';
function UserLayouts() {
  return (
    <>

      <HeaderUser />

      <Container>

        <Outlet />

      </Container>
      <Footer />

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

export default UserLayouts;
