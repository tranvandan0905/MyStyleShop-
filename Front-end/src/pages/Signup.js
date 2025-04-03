import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { postSignup } from "../services/AuthService";
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    MDBIcon,
    MDBCheckbox
} from "mdb-react-ui-kit";

function Signup() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate(); // Hook điều hướng

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (formData.password !== formData.confirmPassword) {
            setError("❌ Mật khẩu xác nhận không khớp!");
            return;
        }

        try {
            await postSignup(formData);
            setSuccess("🎉 Đăng ký thành công! Đang chuyển hướng...");
            setTimeout(() => navigate("/login"), 2000); // Chuyển hướng sau 2 giây
        } catch (err) {
            setError(err.response?.data?.message || "❌ Lỗi đăng ký!");
        }
    };

    return (
        <MDBContainer fluid>
            <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol md="10" lg="6" className="order-2 order-lg-1 d-flex flex-column align-items-center">
                            <h1 className="text-center fw-bold mb-4 mt-4">Sign up</h1>

                            {error && <p className="text-danger">{error}</p>}
                            {success && <p className="text-success">{success}</p>}

                            <form onSubmit={handleSubmit}>
                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="user me-3" size="lg" />
                                    <MDBInput label="Your Name" name="username" type="text" value={formData.username} onChange={handleChange} required />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="envelope me-3" size="lg" />
                                    <MDBInput label="Your Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="phone me-3" size="lg" />
                                    <MDBInput label="Phone Number" name="phone" type="text" value={formData.phone} onChange={handleChange} />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="map-marker-alt me-3" size="lg" />
                                    <MDBInput label="Address" name="address" type="text" value={formData.address} onChange={handleChange} />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="lock me-3" size="lg" />
                                    <MDBInput label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="key me-3" size="lg" />
                                    <MDBInput label="Repeat your password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required />
                                </div>

                                <div className="mb-4">
                                    <MDBCheckbox name="newsletter" label="Subscribe to our newsletter" />
                                </div>

                                <MDBBtn className="mb-4" size="lg" type="submit">Register</MDBBtn>
                            </form>
                        </MDBCol>

                        <MDBCol md="10" lg="6" className="order-1 order-lg-2 d-flex align-items-center">
                            <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" fluid />
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
}

export default Signup;
