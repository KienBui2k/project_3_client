import React, { useEffect } from "react";
import validate from "@utils/validate";
import api from "@api";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
export default function Login() {
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
    useEffect(() => {
        if (localStorage.getItem("token")) {
            window.location.href = "/";
        }
    });
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
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    if (
                        e.target.user_name.value == "" ||
                        e.target.password.value == ""
                    ) {
                        toastWarning("bạn chưa điền đủ các trường thông tin");
                        return;
                    }
                    let data = {
                        user_name: e.target.user_name.value,
                        password: e.target.password.value,
                        type: !validate.isEmail(e.target.user_name.value), // Email false, User Name true
                    };

                    try {
                        let result = await api.users.login(data);
                        if (result.status == 200) {
                            if (result.data.token == undefined) {
                                toastError("Đăng nhập thất bại");
                            } else {
                                localStorage.setItem(
                                    "token",
                                    result.data.token
                                );
                                toastSuccess("Đăng nhập Thành Công");
                                window.location.href = "/";
                            }
                        } else {
                            toastError(result.data.message);
                        }
                    } catch (error) {}
                }}
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
                                    Trang chủ
                                </button>
                                <h2
                                    style={{ textAlign: "center" }}
                                    className="fw-bold mb-5"
                                >
                                    Login Form
                                </h2>
                                <div>
                                    {/* Email input */}
                                    <div className="form-outline mb-4">
                                        <label
                                            style={{
                                                float: "left",
                                                marginRight: "12px",
                                                minWidth: "500px",
                                            }}
                                            className="form-label"
                                        >
                                            User Name or Email
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="User Name or Email"
                                            className="form-control"
                                            name="user_name"
                                            style={{
                                                border: "1px solid black",
                                                backgroundColor: "#fff",
                                                marginLeft: "5px",
                                                minWidth: "500px",
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
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="Password"
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
                                        Login
                                    </button>
                                    {/* Register buttons */}

                                    <div className="text-center">
                                        <button
                                            onClick={() => {
                                                navigate("/register");
                                            }}
                                            type="button"
                                            className="btn btn-link  mx-1"
                                            style={{
                                                fontSize: "16px",
                                                padding: "10px 8px",
                                                textTransform: "none",
                                            }}
                                        >
                                            Register Now{" "}
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
                                            {" "}
                                            or Login with:
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
            <Toaster />
        </div>
    );
}
