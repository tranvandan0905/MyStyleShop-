import {
    MDBInputGroup, MDBInput, MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRipple,
    MDBBadge,
    MDBTypography,
} from "mdb-react-ui-kit";
import { Navbar, Nav, Container } from "react-bootstrap";
import { filterProduct } from "../services/ProductServices";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const CategoryProduct = () => {
    const { category } = useParams(); 
    const [listCategory, setListCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const getCategory = async () => {
        try {
            setLoading(true);
            const filters = { gender: category }; 
            const res = await filterProduct(filters);

            if (res?.data && res.data.length > 0) {
                setListCategory(res.data);
            } else {
                setListCategory([]);
            }
        } catch (err) {
            console.error("Lỗi API:", err);
            setError("Không thể tải dữ liệu!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCategory();
    }, [category]); 

    const handleBuyNow = (product) => {
        navigate("/ProductDetail", { state: { product } });
    };
    const navigate = useNavigate();
    const handleCategoryClick = (category) => {
        navigate(`/category/${category}`);
    };
    useEffect(() => {
        const filtered = listCategory.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchTerm, listCategory]);
    return (<>
        <Navbar bg="light" expand="lg" className="shadow-sm">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link onClick={() => handleCategoryClick("Quần")}>Quần</Nav.Link>
                    <Nav.Link onClick={() => handleCategoryClick("Áo")}>Áo</Nav.Link>
                    <Nav.Link onClick={() => handleCategoryClick("Mũ")}>Mũ</Nav.Link>
                    <Nav.Link onClick={() => handleCategoryClick("Dày")}>Giày</Nav.Link>
                </Nav>
                <MDBInputGroup className="w-25">
                    <MDBInput label="Tìm kiếm"
                        type="text"
                        className="form-control"
                        placeholder="Search by username..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật searchTerm


                    />

                </MDBInputGroup>
            </Container>
        </Navbar>
        <MDBContainer fluid>
            <MDBTypography tag="h4" className="text-center my-4">
                🛍️ Sản Phẩm: {category}
            </MDBTypography>

            {error && <p className="text-danger text-center">{error}</p>}
            {!loading && listCategory.length === 0 && (
                <p className="text-warning text-center">Không có sản phẩm nào!</p>
            )}

            <MDBRow className="justify-content-center">
                <MDBCol md="12" xl="10">
                    {listCategory
                        .filter((product) =>
                            product.name.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((product, index) => {
                            const discountPrice = (product.price * ((100 - product.discount) / 100)).toLocaleString();

                            return (
                                <MDBCard key={index} className="shadow-0 border rounded-3 my-3">
                                    <MDBCardBody>
                                        <MDBRow>
                              
                                            <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                                                <MDBRipple
                                                    rippleColor="light"
                                                    rippleTag="div"
                                                    className="bg-image rounded hover-zoom hover-overlay"
                                                >
                                                    <MDBCardImage
                                                        src={product.images.length > 0 ? product.images[0] : "/placeholder.jpg"}
                                                        fluid
                                                        className="w-100"
                                                        alt={product.name}
                                                        style={{ height: "180px", objectFit: "cover" }}
                                                    />
                                                    <a href="#!">
                                                        <div
                                                            className="mask"
                                                            style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                                                        ></div>
                                                    </a>
                                                </MDBRipple>
                                            </MDBCol>

                                   
                                            <MDBCol md="6">
                                                <MDBTypography tag="h5">{product.name}</MDBTypography>
                                                <p className="mb-2 text-muted small">{product.description || "Không có mô tả"}</p>
                                                <div className="d-flex justify-content-start">
                                                    <MDBBadge color="danger" className="me-2">
                                                        Giảm {product.discount}%
                                                    </MDBBadge>
                                                </div>
                                            </MDBCol>

                                
                                            <MDBCol md="6" lg="3" className="d-flex flex-column align-items-end">
                                                <h5 className="text-danger fw-bold">{discountPrice}₫</h5>
                                                <del className="text-muted">{product.price.toLocaleString()}₫</del>
                                                <MDBBtn
                                                    color="primary"
                                                    size="md"
                                                    className="mt-2"
                                                    onClick={() => handleBuyNow(product)}
                                                >
                                                    🛒 Mua ngay
                                                </MDBBtn>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCardBody>
                                </MDBCard>
                            );
                        })}
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    </>);
};

export default CategoryProduct;
