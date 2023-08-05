import React from "react";
import "./Footer.scss";
import { Link, useNavigate } from "react-router-dom";

export default function Footer() {
    const navigate = useNavigate();
    return (
        <section className="footer_conteiner">
            <div className="footer">
                <div className="box-container">
                    <div className="box">
                        <h3>our menu</h3>
                        <a
                            href="#popular"
                            onClick={() => navigate("/menu/pizza")}
                        >
                            <i className="fas fa-arrow-right"></i> pizza
                        </a>
                        <a
                            href="#popular"
                            onClick={() => navigate("/menu/burger")}
                        >
                            <i className="fas fa-arrow-right"></i> burger
                        </a>
                        <a
                            href="#popular"
                            onClick={() => navigate("/menu/chicken")}
                        >
                            <i className="fas fa-arrow-right"></i> chicken
                        </a>
                        <a
                            href="#popular"
                            onClick={() => navigate("/menu/combo")}
                        >
                            <i className="fas fa-arrow-right"></i> combo
                        </a>
                        <a
                            href="#popular"
                            onClick={() => navigate("/menu/drink")}
                        >
                            <i className="fas fa-arrow-right"></i> drink
                        </a>
                    </div>

                    <div className="box">
                        <h3>quick links</h3>
                        <a href="#home" onClick={() => navigate("/")}>
                            {" "}
                            <i className="fas fa-arrow-right"></i> home
                        </a>
                        <a href="#about" onClick={() => navigate("/")}>
                            {" "}
                            <i className="fas fa-arrow-right"></i> about
                        </a>
                        <a href="#category" onClick={() => navigate("/")}>
                            {" "}
                            <i className="fas fa-arrow-right"></i> category
                        </a>
                    </div>

                    <div className="box">
                        <h3>extra links</h3>
                        <a href="#order" onClick={() => navigate("/order")}>
                            {" "}
                            <i className="fas fa-arrow-right"></i> my orders
                        </a>
                    </div>

                    <div className="box">
                        <h3>opening hours</h3>
                        <p>monday : 7:00am to 10:00pm</p>
                        <p>tuesday : 7:00am to 10:00pm</p>
                        <p>wednesday : 7:00am to 10:00pm</p>
                        <p>thursday : 7:00am to 10:00pm</p>
                        <p>friday : 7:00am to 10:00pm</p>
                        <p>saturday and sunday : 7:00am to 10:00pm</p>
                    </div>
                </div>
                <div className="bottom">
                    <div className="share">
                        <a href="#" className="fab fa-facebook-f"></a>
                        <a href="#" className="fab fa-twitter"></a>
                        <a href="#" className="fab fa-instagram"></a>
                        <a href="#" className="fab fa-linkedin"></a>
                        <a href="#" className="fab fa-pinterest"></a>
                    </div>
                </div>
            </div>
        </section>
    );
}
