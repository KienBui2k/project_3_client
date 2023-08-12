import React, { useEffect } from "react";
import "./about.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";
export default function About() {
    const { t } = useTranslation();
    useEffect(() => {
        // Khởi tạo thư viện AOS
        AOS.init();
    }, []);
    return (
        <div>
            <div data-aos="fade-up" data-aos-delay="400" className="heading">
                <img src="./images/titulo-encabezado.png" alt="" />
                <h3>{t("about")}</h3>
            </div>
            <div className="about_caja-container">
                <div
                    data-aos="fade-down-right"
                    data-aos-delay="400"
                    className="cajas_one"
                >
                    <div className="contenido">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Quod aspernatur modi nihil accusantium quidem
                            quisquam tenetur voluptatem perferendis dolores
                            dolor?
                        </p>
                    </div>
                    <div className="cajas_img">
                        <img src="./images/producto-1.png" alt=""></img>
                    </div>
                </div>
                <div
                    data-aos="fade-down-left"
                    data-aos-delay="600"
                    className="cajas_tow"
                >
                    <div className="contenido">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Quod aspernatur modi nihil accusantium quidem
                            quisquam tenetur voluptatem perferendis dolores
                            dolor?
                        </p>
                    </div>
                    <div className="cajas_img">
                        <img src="./images/producto-1.png" alt=""></img>
                    </div>
                </div>
                <div
                    data-aos="fade-up-right"
                    data-aos-delay="600"
                    className="cajas_three"
                >
                    <div className="cajas_img">
                        <img src="./images/producto-1.png" alt=""></img>
                    </div>
                    <div className="contenido">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Quod aspernatur modi nihil accusantium quidem
                            quisquam tenetur voluptatem perferendis dolores
                            dolor?
                        </p>
                    </div>
                </div>
                <div
                    data-aos="fade-up-left"
                    data-aos-delay="400"
                    className="cajas_four"
                >
                    <div className="cajas_img">
                        <img src="./images/producto-1.png" alt=""></img>
                    </div>
                    <div className="contenido">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Quod aspernatur modi nihil accusantium quidem
                            quisquam tenetur voluptatem perferendis dolores
                            dolor?
                        </p>
                    </div>
                </div>
            </div>

            <div className="about">
                <div
                    className="imagen"
                    data-aos="fade-right"
                    data-aos-delay="600"
                >
                    <img src="./images/about-img.png" alt="" />
                </div>
                <div
                    className="contenido"
                    data-aos="fade-left"
                    data-aos-delay="600"
                >
                    <h3
                        data-aos="fade-left"
                        data-aos-delay="800"
                        className="titulo"
                    >
                        {t("TRY_OUR_BEST_RECIPES")}
                    </h3>
                    <p data-aos="fade-left" data-aos-delay="1000">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Vel dolorem aut error magnam, odit quas, eveniet
                        molestiae numquam possimus perferendis praesentium nisi,
                        minima ratione! Consectetur debitis suscipit, iste
                        numquam delectus hic? Iusto cupiditate id harum
                        similique voluptates at tenetur corporis quibusdam
                        doloremque suscipit veniam quidem quae, commodi minus
                        dolore
                    </p>
                    <div className="iconos">
                        <h3 data-aos="fade-left" data-aos-delay="1200">
                            <i className="fas fa-check"></i>{" "}
                            {t("The_best_prices")}
                        </h3>
                        <h3 data-aos="fade-left" data-aos-delay="1400">
                            <i className="fas fa-check"></i>
                            {t("The_best_service")}
                        </h3>
                        <h3 data-aos="fade-left" data-aos-delay="1600">
                            <i className="fas fa-check"></i>
                            {t("Fast_deliveries")}
                        </h3>
                        <h3 data-aos="fade-left" data-aos-delay="1800">
                            <i className="fas fa-check"></i>
                            {t("Fresh_ingredients")}
                        </h3>
                        <h3 data-aos="fade-left" data-aos-delay="2000">
                            <i className="fas fa-check"></i>
                            {t("Natural_products")}
                        </h3>
                        <h3 data-aos="fade-left" data-aos-delay="2200">
                            <i className="fas fa-check"></i>
                            {t("Vegans_and_non_vegans")}
                        </h3>
                    </div>
                    {/* <a href="#" className="btn">
                        Leer mas
                    </a> */}
                </div>
            </div>
        </div>
    );
}
