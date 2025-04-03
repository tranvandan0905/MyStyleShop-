import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import ReactImageGallery from "react-image-gallery";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import { Container, Row, Col, Button, Badge, Form } from "react-bootstrap";
import { postCart } from "../services/CartService";

const ProductDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state?.product;
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return <h2 className="text-center mt-5">No product data available!</h2>;
    }

 
    const isLoggedIn = !!localStorage.getItem("token");

 
    const discountedPrice = product.price * (1 - product.discount / 100);


    const handleAddToCart = async () => {
        if (!isLoggedIn) {
            alert("Bạn cần đăng nhập để mua hàng!");
            navigate("/login");
            return;
        }

        try {
            console.log("Gửi yêu cầu thêm vào giỏ hàng");
            await postCart(
                {
                    productId: product._id,
                    quantity,
                    price: discountedPrice,
                    name: product.name,
                    image: product.images.length > 0 ? product.images[0] : "",
                },
                { withCredentials: true } 
            );
            alert("Sản phẩm đã được thêm vào giỏ hàng!");
            window.location.reload();
        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ hàng:", error);
            alert("Lỗi khi thêm vào giỏ hàng!");
        }
    };

    return (
        <Container className="my-5">
            <Row>
                <Col md={6}>
                    <ReactImageGallery
                        showBullets={false}
                        showFullscreenButton={false}
                        showPlayButton={false}
                        items={product.images.map((img) => ({
                            original: img,
                            thumbnail: img,
                        }))}
                    />
                </Col>
                <Col md={6}>
                    <h2>{product.name}</h2>
                    <div className="d-flex align-items-center my-2">
                        <Rater total={5} interactive={false} rating={4} />
                        <span className="ms-2 text-muted">(120 reviews)</span>
                    </div>
                    <p>
                        <strong>Availability:</strong>{" "}
                        {product.stock > 0 ? (
                            <Badge bg="success">In Stock</Badge>
                        ) : (
                            <Badge bg="danger">Out of Stock</Badge>
                        )}
                    </p>
                    <p><strong>Brand:</strong> {product.brand || "Unknown"}</p>
                    <p><strong>Gender:</strong> {product.gender}</p>
                    <h3 className="text-danger">
                        ${discountedPrice.toFixed(2)}{" "}
                        {product.discount > 0 && (
                            <del className="text-muted">${product.price.toFixed(2)}</del>
                        )}
                    </h3>
                    <p>{product.description}</p>
                    <Form.Group className="mb-3">
                        <Form.Label><strong>Quantity:</strong></Form.Label>
                        <Form.Control
                            type="number"
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                            }
                            min="1"
                            max={product.stock}
                            style={{ width: "70px" }}
                        />
                    </Form.Group>

                    <div className="mt-4 d-flex gap-3">
                        <Button variant="primary" onClick={handleAddToCart}>
                            <BiShoppingBag className="me-2" /> Add to Cart
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetail;
