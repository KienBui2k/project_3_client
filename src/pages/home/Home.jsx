import "./home.scss";
import { Outlet } from "react-router-dom";
import { useEffect, useContext } from "react";

import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router";

import { RootContext } from "../../App";

function Home() {
    const { userStore, dispatch, userActions } = useContext(RootContext);
    const navigate = useNavigate();
    const { t } = useTranslation();
    // const [isLogin, setIsLogin] = useState(
    //     () => localStorage.getItem("token") || null
    // );
    const isLogin = localStorage.getItem("token") || null;

    useEffect(() => {
        dispatch(userActions.authenToken());
    }, []);
    return (
        <div className="root_page">
            {/* Before Nav */}
            <section className="before_nav">
                <div className="before_nav_content">
                    {/* <h1 className="brand_name">
                      JS_230410_CLIENT {t("hello")} - {t("about")} User:{" "}
                      {store.userStore?.data?.first_name}{" "}
                      {store.userStore?.data?.last_name}
                  </h1> */}
                    <h1 className="brand_name">Fastfood</h1>
                    <div className="feature">
                        <span
                            onClick={() => {
                                navigate("/admin.v2");
                            }}
                            className="feature_item"
                        >
                            {t("Find_a_Store")}
                        </span>

                        {/* //<span className="feature_item">Login</span> */}
                        {isLogin ? (
                            // Nút đăng xuất
                            <span
                                className="feature_item"
                                onClick={() => {
                                    if (window.confirm(t("Log_out_confirm"))) {
                                        localStorage.removeItem("token");
                                        window.location.href = "/";
                                    }
                                }}
                            >
                                {t("Log out")}
                            </span>
                        ) : (
                            // Nút đăng nhập
                            <span
                                className="feature_item"
                                onClick={() => {
                                    navigate("/login");
                                }}
                            >
                                {t("Login")}
                            </span>
                        )}
                        {userStore?.data?.first_name &&
                        userStore?.data?.last_name ? (
                            <span className="feature_item">
                                {t("hello")} {userStore?.data?.first_name}{" "}
                                {userStore?.data?.last_name}
                                {"!"}
                            </span>
                        ) : (
                            // Nếu không có first name và last name, căn giữa chữ "hello"
                            <span
                                className="feature_item"
                                style={{
                                    textAlign: "center",
                                }}
                            >
                                {t("hello")}
                                {"!"}
                            </span>
                        )}
                    </div>
                </div>
            </section>
            {/* Navbar */}
            <Navbar />
            {/* Body */}
            <section className="body_container">
                <div className="body_container_center">
                    <Outlet />
                </div>
            </section>
            {/* Footer */}
            <Footer />
        </div>
    );
}

export default Home;
