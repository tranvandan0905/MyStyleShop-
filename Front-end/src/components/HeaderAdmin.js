import React from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HeaderAdmin() {
    return (
        <Navbar expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/admin/">Admin Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                
                        <Nav.Link as={Link} to="/admin/user/list">Users</Nav.Link>
                
                        <Nav.Link as={Link} to="/admin/product/list">Product</Nav.Link>
                        <Nav.Link as={Link} to="/admin/category/list">Category</Nav.Link>
                     
                    </Nav>
                    <Button variant="outline-light" as={Link} to="/admin/logout">Logout</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default HeaderAdmin;
