import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";

const Header = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token"); 

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login"); 
        window.location.reload(); 
    };

    const handleCategoryClick = (category) => {
        navigate(`/category/${category}`);
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <strong>FashionStore</strong>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Danh mục" id="categories-dropdown">
                            <NavDropdown.Item onClick={() => handleCategoryClick("Nam")}>Nam</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => handleCategoryClick("Nữ")}>Nữ</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={() => handleCategoryClick("Khuyến mãi")}>Khuyến mãi</NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Link as={Link} to="/contact">Liên hệ</Nav.Link>
                    </Nav>

                    <Nav className="ms-3">
                        <Nav.Link as={Link} to="/cart">
                            <FaShoppingCart size={20} /> Giỏ hàng
                        </Nav.Link>

                        {isLoggedIn ? (
                            <Nav.Link onClick={handleLogout} style={{ cursor: "pointer", color: "red" }}>
                                <FaUser size={20} /> Đăng xuất
                            </Nav.Link>
                        ) : (
                            <Nav.Link as={Link} to="/login">
                                <FaUser size={20} /> Đăng nhập
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
