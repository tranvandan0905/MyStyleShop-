import React from 'react';
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";
export const Footer = () => {
    return (
        <footer className="text-center" style={{ backgroundColor: "#f5f5f5" }}>
            <div className="container p-4">
                <section className="mb-4">
                    <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: "#3b5998" }} href="#!" role="button">
                        <FaFacebookF />
                    </a>
                    <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: "#55acee" }} href="#!" role="button">
                        <FaTwitter />
                    </a>
                    <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: "#dd4b39" }} href="#!" role="button">
                        <FaGoogle />
                    </a>
                    <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: "#ac2bac" }} href="#!" role="button">
                        <FaInstagram />
                    </a>
                    <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: "#0082ca" }} href="#!" role="button">
                        <FaLinkedinIn />
                    </a>
                    <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: "#333333" }} href="#!" role="button">
                        <FaGithub />
                    </a>
                </section>
                <section className="mb-4">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                        distinctio earum repellat quaerat voluptatibus placeat nam,
                        commodi optio pariatur est quia magnam eum harum corrupti dicta,
                        aliquam sequi voluptate quas.
                    </p>
                </section>

                <section>
                    <div className="row">
                        {Array(2).fill().map((_, index) => (
                            <div key={index} className="col-lg-3 col-md-6 mb-4 mb-md-0">
                                <h5 className="text-uppercase">Links</h5>
                                <ul className="list-unstyled mb-0">
                                    <li><a href="#!" className="text-dark">Link 1</a></li>
                                    <li><a href="#!" className="text-dark">Link 2</a></li>
                                    <li><a href="#!" className="text-dark">Link 3</a></li>
                                    <li><a href="#!" className="text-dark">Link 4</a></li>
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2020 Copyright:
                <a className="text-dark" href="https://mdbootstrap.com/">MDBootstrap.com</a>
            </div>
        </footer>
    );
};
