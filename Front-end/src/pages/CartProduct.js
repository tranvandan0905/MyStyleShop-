import React, { useEffect, useState } from "react";
import { getCart, deleteCart } from "../services/CartService";
import { postOrder } from "../services/OrderService";

import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";

const CartProduct = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await getCart();
             
                if (!res || res.errorCode !== 0) {
                    console.error("⚠️ API trả về lỗi hoặc không phản hồi hợp lệ");
                    return;
                }
                setCart(res.cart || []); 
            } catch (error) {
                console.error("Lỗi khi gọi API:", error.message);
            }
        };

        fetchCart();
    }, []);

    useEffect(() => {
        console.log(cart);
    }, [cart]);


    const handleRemoveFromCart = async (productId) => {
        try {
            const response = await deleteCart(productId);

            if (response && response.errorCode === 0) {
                alert(" Sản phẩm đã được xóa khỏi giỏ hàng!");

                const res = await getCart();
                console.log(res);
                setCart(res.cart || []);

            } else {
                throw new Error("Không thể xóa sản phẩm");
            }
        } catch (error) {
            console.error("Lỗi khi xóa khỏi giỏ hàng:", error);
            alert(" Lỗi khi xóa khỏi giỏ hàng!");
        }
    };
    const handleCheckout = async () => {


        if (cart.length === 0) {
            alert("⚠️ Giỏ hàng của bạn đang trống!");
            return;
        }

        const orderData = {
            paymentMethod: "COD",
            shippingAddress: "123 Đường ABC, Quận 1, TP.HCM",
        };

        try {
            const response = await postOrder(orderData);
            if (response && response.errorCode === 0) {
                alert(" Đặt hàng thành công!");
                setCart([]);
            } else {
                throw new Error(response?.message || "Lỗi khi đặt hàng");
            }
        } catch (error) {
            console.error("Lỗi khi thanh toán:", error);
            alert(" Thanh toán thất bại!");
        }
    };


    return (
        <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol lg="8">
                        <MDBCard>
                            <MDBCardBody className="p-4">
                                <MDBTypography tag="h5">
                                    <a href="#!" className="text-body">
                                        <MDBIcon fas icon="long-arrow-alt-left me-2" /> Tiếp tục mua sắm
                                    </a>
                                </MDBTypography>
                                <hr />

                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <div>
                                        <p className="mb-1">Giỏ hàng</p>
                                        <p className="mb-0">Bạn có {cart.length} sản phẩm trong giỏ</p>
                                    </div>
                                </div>

                                {cart.length === 0 ? (
                                    <p>Giỏ hàng trống</p>
                                ) : (
                                    cart.map((item, index) => (
                                        <MDBCard key={index} className="mb-3">
                                            <MDBCardBody>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex flex-row align-items-center">
                                                        <MDBCardImage
                                                            src={item.image}
                                                            fluid className="rounded-3"
                                                            style={{ width: "65px" }}
                                                            alt={item.name}
                                                        />
                                                        <div className="ms-3">
                                                            <MDBTypography tag="h5">{item.name}</MDBTypography>
                                                            <p className="small mb-0">Số lượng: {item.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex flex-row align-items-center">
                                                        <div style={{ width: "80px" }}>
                                                            <MDBTypography tag="h5" className="mb-0">
                                                                {item.price.toLocaleString()} VND
                                                            </MDBTypography>
                                                        </div>
                                                        <MDBBtn color="danger" size="md" onClick={() => handleRemoveFromCart(item.productId)}>
                                                            <MDBIcon far icon="trash-alt" /> Xóa
                                                        </MDBBtn>
                                                    </div>
                                                </div>
                                            </MDBCardBody>
                                        </MDBCard>
                                    ))
                                )}

                                <MDBBtn color="info" block size="lg" onClick={handleCheckout}>
                                    <div className="d-flex justify-content-between">
                                        <span>Thanh toán</span>
                                        <MDBIcon fas icon="long-arrow-alt-right ms-2" />
                                    </div>
                                </MDBBtn>

                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
};

export default CartProduct;
