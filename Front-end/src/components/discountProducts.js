import { Container, Row, Col, Card, Badge, Alert, Spinner } from "react-bootstrap";
import { filterProduct } from "../services/ProductServices";
import React, { useState, useEffect } from "react";

const DiscountCategory = () => {
    const [listCategory, setlistCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getCategory = async () => {
        try {
            setLoading(true);
            const filters = { gender: "Khuyến mãi" };
            const res = await filterProduct(filters);
         
            if (res?.data && res.data.length > 0) {
                setlistCategory(res.data.slice(0, 4)); // Lấy 4 sản phẩm đầu tiên


            } else {
                setlistCategory([]);
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
    }, []);

    return (
        <Container className="mt-4">
            <h4 className="text-center mb-3">🛍️ Sản Phẩm Khuyến Mãi</h4>

            {loading && <Spinner animation="border" className="d-block mx-auto my-3" />}
            {error && <Alert variant="danger">{error}</Alert>}
            {!loading && listCategory.length === 0 && <Alert variant="warning">Không có sản phẩm khuyến mãi nào!</Alert>}

            <Row>
                {listCategory.map((product, index) => {
                    const discountPercent =(product.price * ((100-product.discount )/ 100))
                    

                    return (
                        <Col key={index} xs={6} sm={4} md={3} className="mb-4">
                            <Card className="shadow-sm">
                                <Card.Img
                                    variant="top"
                                    src={product.images.length > 0 ? product.images[0] : "/placeholder.jpg"}
                                    style={{ height: "180px", objectFit: "cover" }}
                                />
                                <Card.Body>
                                    <Card.Title className="text-center">{product.name}</Card.Title>
                                    <Card.Text className="text-center">
                                        <del className="text-muted">{product.price.toLocaleString()}₫</del>{" "}
                                        <span className="text-danger fw-bold">
                                            {discountPercent.toLocaleString()}₫
                                        </span>
                                    </Card.Text>
                                    <div className="text-center">
                                        <Badge bg="danger">Giảm {product.discount}%</Badge>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
};

export default DiscountCategory;
