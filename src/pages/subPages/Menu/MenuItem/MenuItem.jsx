import React from "react";
import "./MenuItem.scss";
import { useNavigate } from "react-router";
export default function MenuItem({ product, timeDelay }) {
    const navigate = useNavigate();
    return (
        <div className="menu_items">
            <div
                data-aos="fade-up"
                data-aos-delay={timeDelay}
                className="product_img"
            >
                <img
                    onClick={() => {
                        navigate(`/product/${product.id}`);
                    }}
                    src={product.avatar}
                    alt=""
                />
            </div>
            <div
                data-aos="fade-up"
                data-aos-delay={timeDelay + 200}
                className="product_name"
                onClick={() => {
                    navigate(`/product/${product.id}`);
                }}
            >
                <h4>{product.name}</h4>
            </div>
            <div className="product_info">
                <div
                    data-aos="fade-up"
                    data-aos-delay={timeDelay + 400}
                    className="product_price"
                >
                    <h5>{product.price} $</h5>
                </div>
                <div
                    data-aos="fade-up"
                    data-aos-delay={timeDelay + 600}
                    className="product_addtoCart"
                    onClick={() => {
                        navigate(`/product/${product.id}`);
                    }}
                >
                    <i className="fa-solid fa-cart-shopping"></i>
                </div>
            </div>
        </div>
    );
}
