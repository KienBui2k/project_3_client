import React from "react";
import api from "@api";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
export default function Register() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const toastSuccess = (text) => {
        toast.success(text, {
            position: "top-center",
        });
    };
    const toastError = (text) => {
        toast.error(text, {
            position: "top-center",
        });
    };
    const toastWarning = (text) => {
        toast(text, {
            icon: "⚠️",
            style: {
                color: "#000",
            },
            position: "top-center",
        });
    };
    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: `url(${process.env.PUBLIC_URL}/images/bg.jpg)`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Section: Design Block */}
            <form
                style={{
                    maxWidth: "1440px",
                    width: "100%",
                }}
                onSubmit={async (e) => {
                    e.preventDefault();

                    let newUser = {
                        user_name: e.target.user_name.value,
                        email: e.target.email.value,
                        first_name: e.target.first_name.value,
                        last_name: e.target.last_name.value,
                        password: e.target.password.value,
                    };

                    let result = await api.users.register(newUser);

                    if (result.status != 200) {
                        toastError(result.response.data.message);
                    } else {
                        toastSuccess(
                            result.data != undefined
                                ? result.data.message
                                : result.message
                        );
                        window.location.href = "/login";
                    }
                }}
                className="text-center"
            >
                <div
                    className="card mx-4 mx-md-5 shadow-5-strong"
                    style={{
                        marginTop: "-100px",
                        background: "hsla(0, 0%, 100%, 0.8)",
                        backdropFilter: "blur(30px)",
                    }}
                >
                    <div className="card-body py-5 px-md-5">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8">
                                <button
                                    type="button"
                                    onClick={() => {
                                        window.location.href = "/";
                                    }}
                                    className="btn btn-link"
                                    style={{
                                        position: "absolute",
                                        left: "30px",
                                        top: "30px",
                                        fontSize: "18px",
                                    }}
                                >
                                    {t("home")}
                                </button>
                                <h2
                                    style={{ textAlign: "center" }}
                                    className="fw-bold mb-5"
                                >
                                    {t("Register_Form")}
                                </h2>
                                <div>
                                    {/* 2 column grid layout with text inputs for the first and last names */}
                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <label
                                                    style={{
                                                        float: "left",
                                                        marginRight: "12px",
                                                    }}
                                                    className="form-label"
                                                >
                                                    {t("First_name")}
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder={t(
                                                        "First_name"
                                                    )}
                                                    className="form-control"
                                                    name="first_name"
                                                    style={{
                                                        border: "1px solid black",
                                                        backgroundColor: "#fff",
                                                        marginLeft: "5px",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-outline">
                                                <label
                                                    style={{
                                                        float: "left",
                                                        marginRight: "12px",
                                                    }}
                                                    className="form-label"
                                                >
                                                    {t("Last_name")}
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder={t("Last_name")}
                                                    className="form-control"
                                                    name="last_name"
                                                    style={{
                                                        border: "1px solid black",
                                                        backgroundColor: "#fff",
                                                        marginLeft: "5px",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* User Name input */}
                                    <div className="form-outline mb-4">
                                        <label
                                            style={{
                                                float: "left",
                                                marginRight: "12px",
                                            }}
                                            className="form-label"
                                        >
                                            {t("Use_name")}
                                        </label>
                                        <input
                                            type="text"
                                            placeholder={t("Use_name")}
                                            className="form-control"
                                            name="user_name"
                                            style={{
                                                border: "1px solid black",
                                                backgroundColor: "#fff",
                                                marginLeft: "5px",
                                            }}
                                        />
                                    </div>
                                    {/* Email input */}
                                    <div className="form-outline mb-4">
                                        <label
                                            style={{
                                                float: "left",
                                                marginRight: "12px",
                                            }}
                                            className="form-label"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            placeholder={t("Enter_email")}
                                            className="form-control"
                                            name="email"
                                            style={{
                                                border: "1px solid black",
                                                backgroundColor: "#fff",
                                                marginLeft: "5px",
                                            }}
                                        />
                                    </div>
                                    {/* Password input */}
                                    <div className="form-outline mb-4">
                                        <label
                                            style={{
                                                float: "left",
                                                marginRight: "12px",
                                            }}
                                            className="form-label"
                                        >
                                            {t("Password")}
                                        </label>
                                        <input
                                            type="password"
                                            placeholder={t("Password")}
                                            className="form-control"
                                            name="password"
                                            style={{
                                                border: "1px solid black",
                                                backgroundColor: "#fff",
                                                marginLeft: "5px",
                                            }}
                                        />
                                    </div>
                                    {/* Submit button */}
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block mb-4"
                                    >
                                        {t("Register")}
                                    </button>
                                    {/* Register buttons */}
                                    <div className="text-center">
                                        <button
                                            onClick={() => {
                                                navigate("/login");
                                            }}
                                            type="button"
                                            className="btn btn-link  mx-1"
                                            style={{
                                                fontSize: "16px",
                                                padding: "10px 8px",
                                                textTransform: "none",
                                            }}
                                        >
                                            {t("Login_Now")}
                                        </button>{" "}
                                        <span
                                            style={{
                                                fontSize: "16px",
                                                display: "inline-flex",
                                                height: "42px",
                                                fontWeight: "800",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            {t("or_Register_with")}
                                        </span>
                                        <br />
                                        <button
                                            type="button"
                                            className="btn btn-link btn-floating mx-1"
                                        >
                                            <i className="fab fa-facebook-f" />
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-link btn-floating mx-1"
                                        >
                                            <i className="fab fa-google" />
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-link btn-floating mx-1"
                                        >
                                            <i className="fab fa-twitter" />
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-link btn-floating mx-1"
                                        >
                                            <i className="fab fa-github" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            {/* Section: Design Block */}
            <Toaster />
        </div>
    );
}
