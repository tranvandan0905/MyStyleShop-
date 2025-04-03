import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { GiArmoredPants } from "react-icons/gi"; // Icon Quần
import { FaTshirt, FaShoePrints, FaHatCowboy } from "react-icons/fa"; // Icon Áo, Giày, Mũ
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Quần", icon: <GiArmoredPants size={50} />, link: "Quần" },
  { name: "Áo", icon: <FaTshirt size={50} />, link: "Áo" },
  { name: "Giày", icon: <FaShoePrints size={50} />, link: "Giày" },
  { name: "Mũ", icon: <FaHatCowboy size={50} />, link: "Mũ" },
];

export default function CategoryGrid() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <Container className="mt-4">
      <h4 className="text-center mb-3">Danh mục sản phẩm</h4>
      <Row>
        {categories.map((category, index) => (
          <Col key={index} xs={6} sm={3} className="mb-3">
            <Card className="text-center p-3 shadow-sm">
              <div className="mb-2 text-danger">{category.icon}</div>
              <Card.Body>
                <Card.Title style={{ fontSize: "18px" }}>{category.name}</Card.Title>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => handleCategoryClick(category.link)}
                >
                  Xem ngay
                </button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
