import React, { useEffect, useRef, useState } from "react";
import { Carousel } from "antd";
import "./banner.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";
export default function Banner() {
    const { t } = useTranslation();
    useEffect(() => {
        // Khởi tạo thư viện AOS
        AOS.init();
    }, []);
    const slider = useRef();
    const [banners, setBanners] = useState([
        {
            id: 1,
            url: "./images/banner/banner1.jpg",
        },
        {
            id: 2,
            url: "./images/banner/banner2.jpg",
        },
        {
            id: 3,
            url: "./images/banner/banner3.jpg",
        },
    ]);

    return (
        <>
            <div className="vdclass"></div>
            <Carousel
                ref={slider}
                autoplay
                autoplaySpeed={1000}
                effect={"fade"}
                dots={true}
                dotPosition={"bottom"}
                waitForAnimate={"true"}
            >
                {banners.map((banner, index) => (
                    <div
                        className="items"
                        style={{
                            width: "100wh",
                            height: "800px",
                            display: "inline-block",
                        }}
                        key={banner.id + index}
                    >
                        <img
                            style={{
                                width: "100%",
                                height: "100%",
                                display: "inline-block",
                            }}
                            className="items-img"
                            src={banner.url}
                        />
                    </div>
                ))}
            </Carousel>
            <div data-aos="fade-up" data-aos-delay="600" className="heading">
                <img src="./images/titulo-encabezado.png" alt="" />
                <h3>Menu</h3>
            </div>
            <div className="caja-container">
                <div className="cajas" data-aos="fade-up" data-aos-delay="1000">
                    <img src="./images/producto-1.png" alt=""></img>
                    <div className="contenido">
                        <h4>Combo</h4>
                    </div>
                </div>
                <div className="cajas" data-aos="fade-up" data-aos-delay="800">
                    <img src="./images/producto-1.png" alt=""></img>
                    <div className="contenido">
                        <h4>Chicken</h4>
                    </div>
                </div>
                <div className="cajas" data-aos="fade-up" data-aos-delay="1000">
                    <img src="./images/producto-1.png" alt=""></img>
                    <div className="contenido">
                        <h4>Hamburguesa</h4>
                    </div>
                </div>
                <div className="cajas" data-aos="fade-up" data-aos-delay="800">
                    <img src="./images/producto-1.png" alt=""></img>
                    <div className="contenido">
                        <h4>Pizza</h4>
                    </div>
                </div>
                <div className="cajas" data-aos="fade-up" data-aos-delay="1000">
                    <img src="./images/producto-1.png" alt=""></img>
                    <div className="contenido">
                        <h4>Drink</h4>
                    </div>
                </div>
            </div>
            <div data-aos="fade-up" data-aos-delay="400" className="heading">
                <img src="./images/titulo-encabezado.png" alt="" />
                <h3>New Product</h3>
            </div>
            <div className="new_product_main">
                <div className="new_product_container">
                    <div
                        data-aos="fade-left"
                        data-aos-delay="500"
                        className="new_product_item"
                    >
                        <div className="new_product_img_cnt">
                            <div className="img">
                                <img src="./images/about-img.png" alt="" />
                            </div>
                        </div>
                        <div className="new_product_info">
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Accusamus, qui! Lorem ipsum
                                dolor sit amet consectetur adipisicing elit.
                                Accusamus, qui!
                            </p>
                        </div>
                    </div>
                    <div
                        data-aos="fade-left"
                        data-aos-delay="600"
                        className="new_product_item"
                    >
                        <div className="new_product_img_cnt">
                            <div className="img">
                                <img src="./images/about-img.png" alt="" />
                            </div>
                        </div>
                        <div className="new_product_info">
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Accusamus, qui! Lorem ipsum
                                dolor sit amet consectetur adipisicing elit.
                                Accusamus, qui!
                            </p>
                        </div>
                    </div>
                    <div
                        data-aos="fade-left"
                        data-aos-delay="700"
                        className="new_product_item"
                    >
                        <div className="new_product_img_cnt">
                            <div className="img">
                                <img src="./images/about-img.png" alt="" />
                            </div>
                        </div>
                        <div className="new_product_info">
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Accusamus, qui! Lorem ipsum
                                dolor sit amet consectetur adipisicing elit.
                                Accusamus, qui!
                            </p>
                        </div>
                    </div>
                    <div
                        data-aos="fade-left"
                        data-aos-delay="800"
                        className="new_product_item"
                    >
                        <div className="new_product_img_cnt">
                            <div className="img">
                                <img src="./images/about-img.png" alt="" />
                            </div>
                        </div>
                        <div className="new_product_info">
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Accusamus, qui! Lorem ipsum
                                dolor sit amet consectetur adipisicing elit.
                                Accusamus, qui!
                            </p>
                        </div>
                    </div>
                    <div
                        data-aos="fade-left"
                        data-aos-delay="900"
                        className="new_product_item"
                    >
                        <div className="new_product_img_cnt">
                            <div className="img">
                                <img src="./images/about-img.png" alt="" />
                            </div>
                        </div>
                        <div className="new_product_info">
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Accusamus, qui! Lorem ipsum
                                dolor sit amet consectetur adipisicing elit.
                                Accusamus, qui! Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Accusamus, qui!
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Accusamus, qui! Lorem ipsum
                                dolor sit amet consectetur adipisicing elit.
                                Accusamus, qui! Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Accusamus, qui!
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Accusamus, qui! Lorem ipsum
                                dolor sit amet consectetur adipisicing elit.
                                Accusamus, qui!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

//  data-aos="fade-up" data-aos-delay="350"
