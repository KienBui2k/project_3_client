import React, { useContext } from "react";

/* Antd */
import { AutoComplete, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router";
import DropdownLogout from "./Dropdowns/Dropdown";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { RootContext } from "../App";
import Example from "../pages/subPages/search/n";

export default function Navbar() {
    const {cartStore } = useContext(RootContext);
    const { t } = useTranslation();
    const [isLogin, setIsLogin] = useState(
        () => localStorage.getItem("token") || null
    );
    const navigate = useNavigate();
    const renderTitle = (title) => (
        <span>
            {title}
            <a
                style={{
                    float: "right",
                }}
                href="https://www.google.com/search?q=antd"
                target="_blank"
                rel="noopener noreferrer"
            >
                more
            </a>
        </span>
    );

    const renderItem = (title, count) => ({
        value: title,
        label: (
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                {title}
                <span>
                    <UserOutlined /> {count}
                </span>
            </div>
        ),
    });

    const options = [
        {
            label: renderTitle("Libraries"),
            options: [
                renderItem("AntDesign", 10000),
                renderItem("AntDesign UI", 10600),
            ],
        },
        {
            label: renderTitle("Solutions"),
            options: [
                renderItem("AntDesign UI FAQ", 60100),
                renderItem("AntDesign FAQ", 30010),
            ],
        },
        {
            label: renderTitle("Articles"),
            options: [renderItem("AntDesign design language", 100000)],
        },
    ];

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
                            // navigate("/search");
                            <Example></Example>;
                        }}
                        className="item"
                    >
                        Tìm kiếm
                    </div>
                </div>

                <div className="right_content">
                    {/* Search */}
                    <AutoComplete
                        popupClassName="certain-category-search-dropdown"
                        popupMatchSelectWidth={500}
                        style={{
                            width: 250,
                        }}
                        options={options}
                    >
                        <Input.Search
                            style={{ position: "relative", right: "30px" }}
                            size="large"
                            placeholder="input here"
                        />
                    </AutoComplete>

                    {/* Cart */}
                    <div
                        onClick={() => {
                            navigate("/cart");
                        }}
                        className="cart_coutn "
                    >
                        <span>
                            {cartStore.data?.cart_details?.reduce(
                                (result, nextItem) => {
                                    return (result += nextItem.quantity);
                                },
                                0
                            )}
                        </span>
                        <i className="fa-solid fa-cart-shopping"></i>
                    </div>

                    {isLogin ? <DropdownLogout /> : <></>}
                </div>
            </div>
        </nav>
    );
}
