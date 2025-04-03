import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../services/AuthService";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import {

    MDBInput,
    MDBIcon,

}
    from 'mdb-react-ui-kit';
import styled from "styled-components";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  background-color: whitesmoke;
  padding-bottom: 50px;
`;

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await postLogin({ username, password });
            console.log("Login API Response:", response);

            if (!response || !response.role || !response.token) {
                throw new Error("Invalid API response data!");
            }

            localStorage.setItem("role", response.role);
            localStorage.setItem("token", response.token);

            navigate("/");
            window.location.reload();
        } catch (err) {
            console.error("Login error:", err);
            setError(err.response?.data?.message || "Login failed!");
        }
    };

    return (
        <PageWrapper>
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Form onSubmit={handleLogin} className="p-4 border rounded shadow bg-light w-25">
                    <h2 className="text-center mb-4">Login</h2>
                    {error && <p className="text-danger text-center">{error}</p>}
                    <div className="d-flex flex-row align-items-center mb-4 ">
                        <MDBIcon fas icon="user me-3" size='lg' />
                        <MDBInput label='Enter your username' type='text' value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required className='w-100' />
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                        <MDBIcon fas icon="lock me-3" size='lg' />
                        <MDBInput label='Enter your password' id='form3' value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required type='password' />
                    </div>



                    <Button type="submit" variant="primary" className="w-100">Login</Button>
                    <a href="#" onClick={() => navigate("/register")}>Sign up</a>

                </Form>
            </Container>
        </PageWrapper>
    );
}

export default Login;
