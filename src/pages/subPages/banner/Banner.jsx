import React, { useEffect, useRef, useState } from "react";
import { Carousel } from "antd";
import "./banner.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { newcategoryActions } from "../../../stores/slices/newProduct";
import { useDispatch, useSelector } from "react-redux";
export default function Banner() {
    const navigate = useNavigate();
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
    const dispatch = useDispatch();

    const latestProducts = useSelector((store) => store.newcategoryStore);
    useEffect(() => {
        dispatch(newcategoryActions.findLatestProductsByCategory());
    }, []);

    const allProducts =
        latestProducts?.data?.flatMap((category) => category.products) || [];
    console.log("allProducts", allProducts);

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
                    <img
                        onClick={() => {
                            navigate("/menu/combo");
                        }}
                        src="./images/producto-1.png"
                        alt=""
                    ></img>
                    <div
                        onClick={() => {
                            navigate("/menu/combo");
                        }}
                        className="contenido"
                    >
                        <h4>Combo</h4>
                    </div>
                </div>
                <div className="cajas" data-aos="fade-up" data-aos-delay="800">
                    <img
                        onClick={() => {
                            navigate("/menu/chicken");
                        }}
                        src="./images/producto-1.png"
                        alt=""
                    ></img>
                    <div
                        onClick={() => {
                            navigate("/menu/chicken");
                        }}
                        className="contenido"
                    >
                        <h4>Chicken</h4>
                    </div>
                </div>
                <div className="cajas" data-aos="fade-up" data-aos-delay="1000">
                    <img
                        onClick={() => {
                            navigate("/menu/burger");
                        }}
                        src="./images/producto-1.png"
                        alt=""
                    ></img>
                    <div
                        onClick={() => {
                            navigate("/menu/burger");
                        }}
                        className="contenido"
                    >
                        <h4>Hamburguesa</h4>
                    </div>
                </div>
                <div className="cajas" data-aos="fade-up" data-aos-delay="800">
                    <img
                        onClick={() => {
                            navigate("/menu/pizza");
                        }}
                        src="./images/producto-1.png"
                        alt=""
                    ></img>
                    <div
                        onClick={() => {
                            navigate("/menu/pizza");
                        }}
                        className="contenido"
                    >
                        <h4>Pizza</h4>
                    </div>
                </div>
                <div className="cajas" data-aos="fade-up" data-aos-delay="1000">
                    <img
                        onClick={() => {
                            navigate("/menu/drink");
                        }}
                        src="./images/producto-1.png"
                        alt=""
                    ></img>
                    <div
                        onClick={() => {
                            navigate("/menu/drink");
                        }}
                        á
                        className="contenido"
                    >
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
                    {allProducts?.map((item) => (
                        <div
                            data-aos="fade-left"
                            data-aos-delay="500"
                            className="new_product_item"
                        >
                            <div className="new_product_img_cnt">
                                <div className="img">
                                    <img src={item.avatar} alt="" />
                                </div>
                            </div>
                            <div className="new_product_info">
                                <div className="info_one">
                                    <div className="product_info_name">
                                        <h4> {item.name}</h4>
                                    </div>
                                    <div className="product_price">
                                        <h3> {item.price}$</h3>
                                    </div>
                                </div>
                                <div className="info_two">
                                    <span>{item.des}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

//  data-aos="fade-up" data-aos-delay="350"
