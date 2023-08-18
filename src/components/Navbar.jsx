import React, { useContext, useEffect } from "react";

/* Antd */
import { AutoComplete, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router";
import DropdownLogout from "./Dropdowns/Dropdown";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { RootContext } from "../App";
import api from "@api";
export default function Navbar() {
    const { cartStore, localCartState } = useContext(RootContext);
    const { t } = useTranslation();
    const [isLogin, setIsLogin] = useState(
        () => localStorage.getItem("token") || null
    );
    const navigate = useNavigate();

    const [cartLocalTotal, setCartLocalTotal] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    async function totalCartAsync() {
        if (!localStorage.getItem("token")) {
            if (localStorage.getItem("carts")) {
                let carts = JSON.parse(localStorage.getItem("carts"));
                for (let i in carts) {
                    carts[i].product = await api.products
                        .findProductById(carts[i].product_id)
                        .then((res) => res.data.data);
                }
                let total = carts.reduce((result, nextItem) => {
                    return (result += nextItem.quantity);
                }, 0);

                setCartLocalTotal(total);
            }
        }
    }

    useEffect(() => {
        totalCartAsync();
    }, [localCartState]);
    useEffect(() => {
        authenAdmin();
    }, []);
    async function authenAdmin() {
        try {
            const response = await api.users.authenToken({
                token: localStorage.getItem("token"),
            });

            if (
                response.status === 200 &&
                response.data.data.role === "ADMIN"
            ) {
                setIsAdmin(true);
            }
        } catch (error) {
            console.log("err", error);
        }
    }
    function totalCart() {
        return cartStore.data?.cart_details?.reduce((result, nextItem) => {
            return (result += nextItem.quantity);
        }, 0);
    }
    return (
        <nav>
            <div className="nav_content">
                <div className="left_content">
                    {/* Logo */}
                    <img
                        src={`${process.env.REACT_APP_SERVER_HOST}logo1.png`}
                        className="logo"
                        onClick={() => {
                            navigate("/");
                        }}
                    />
                </div>

                <div className="middle_content">
                    <div onClick={() => navigate("/")} className="item">
                        {t("home")}
                    </div>
                    <div
                        onClick={() => {
                            navigate("/about");
                        }}
                        className="item"
                    >
                        {t("about")}
                    </div>
                    <div className="dropdown">
                        <button
                            className="btn btn-primary dropdown-toggle menu-button"
                            type="button"
                            id="dropdownMenuButton"
                            data-mdb-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {t("menu")}
                            <i className="fa-solid fa-caret-down"></i>
                        </button>
                        <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton"
                        >
                            <Link to="menu/combo">
                                <span className="dropdown-item">Combo</span>
                            </Link>
                            <Link to="menu/pizza">
                                <span className="dropdown-item">Pizza</span>
                            </Link>
                            <Link to="menu/burger">
                                <span className="dropdown-item">Burger</span>
                            </Link>
                            <Link to="menu/chicken">
                                <span className="dropdown-item">Chicken</span>
                            </Link>
                            <Link to="menu/drink">
                                <span className="dropdown-item">Drink</span>
                            </Link>
                        </ul>
                    </div>

                    <div
                        onClick={() => {
                            navigate("/contact");
                        }}
                        className="item"
                    >
                        {t("contactus")}
                    </div>
                    <div
                        onClick={() => {
                            navigate("/search");
                        }}
                        className="item"
                    >
                        Tìm Kiếm
                    </div>
                </div>

                <div className="right_content">
                    {/* {isLogin ? <DropdownLogout /> : <></>} */}

                    {isAdmin && ( // Hiển thị nút quản lý chỉ khi là admin
                        <Link to="/admin.v2" className="admin-button">
                            <span> Quản Lý</span>
                        </Link>
                    )}

                    {isLogin ? <DropdownLogout /> : <></>}
                    <div
                        onClick={() => {
                            navigate("/cart");
                        }}
                        className="cart_coutn "
                    >
                        <span>
                            {cartLocalTotal != null
                                ? cartLocalTotal
                                : totalCart()}
                        </span>
                        <i
                            style={{ marginRight: "20px", marginLeft: "20px" }}
                            className="fa-solid fa-cart-shopping"
                        ></i>
                    </div>
                </div>
            </div>
        </nav>
    );
}
