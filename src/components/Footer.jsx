import React from "react";
import "./Footer.scss";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function Footer() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <section className="footer_conteiner">
            <div className="footer">
                <div className="box-container">
                    <div className="box">
                        <h3>{t("our_menu")}</h3>
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
                        <h3>{t("quick_links")}</h3>
                        <a href="#home" onClick={() => navigate("/")}>
                            {" "}
                            <i className="fas fa-arrow-right"></i> {t("home")}
                        </a>
                        <a href="#about" onClick={() => navigate("/")}>
                            {" "}
                            <i className="fas fa-arrow-right"></i> {t("about")}
                        </a>
                        <a href="#category" onClick={() => navigate("/")}>
                            {" "}
                            <i className="fas fa-arrow-right"></i>
                            {t("category")}
                        </a>
                    </div>

                    <div className="box">
                        <h3> {t("extra_links")}</h3>
                        <a href="#order" onClick={() => navigate("/order")}>
                            {" "}
                            <i className="fas fa-arrow-right"></i>{" "}
                            {t("my_orders")}
                        </a>
                    </div>

                    <div className="box">
                        <h3>{t("opening_hours")}</h3>
                        <p>{t("monday")} : 7:00am to 10:00pm</p>
                        <p>{t("tuesday")} : 7:00am to 10:00pm</p>
                        <p>{t("wednesday")} : 7:00am to 10:00pm</p>
                        <p>{t("thursday")} : 7:00am to 10:00pm</p>
                        <p>{t("friday")} : 7:00am to 10:00pm</p>
                        <p>{t("saturday")} : 7:00am to 10:00pm</p>
                        <p>{t("sunday")} : 7:00am to 10:00pm</p>
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
