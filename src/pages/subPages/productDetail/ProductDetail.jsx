import React, { useContext, useEffect, useState } from "react";
import "./productDetail.scss";

import { useParams } from "react-router";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { productActions } from "../../../stores/slices/product";
import { useNavigate } from "react-router";
import { RootContext } from "../../../App";
import api from "../../../services/api";
export default function ProductDetail() {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const {
        userStore,
        cartActions,
        dispatch,
        setLocalCartState,
        localCartState,
    } = useContext(RootContext);
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
    const [note, setNote] = useState("");
    const productStore = useSelector((store) => store.productStore);
    useEffect(() => {
        dispatch(productActions.findProductById(id));
    }, [id]);
    function addToCart() {
        let user_id = userStore.data?.id;
        let data = {
            product_id: id,
            quantity,
            note: note,
        };
        if (localStorage.getItem("token")) {
            api.purchase
                .addToCart(user_id, data)
                .then((res) => {
                    console.log("res 1", res);
                    api.purchase
                        .findCart(userStore.data?.id)
                        .then((res) => {
                            toastSuccess(
                                "thêm sản phẩm vào giỏ hàng thành công"
                            );
                            dispatch(cartActions.setCartData(res.data.data));
                            navigate("/");
                        })
                        .catch((err) => {
                            console.log("err", err);
                            alert("Server bảo trì!");
                        });
                })
                .catch((err) => {
                    alert("Sập!", err);
                });
        } else {
            let carts = localStorage.getItem("carts");
            if (carts) {
                carts = JSON.parse(carts);
                let flag = false;
                carts = carts.map((item) => {
                    if (item.product_id == data.product_id) {
                        item.quantity += data.quantity;
                        flag = true;
                    }
                    return item;
                });
                if (!flag) {
                    carts.push(data);
                }
                localStorage.setItem("carts", JSON.stringify(carts)); // save
            } else {
                let cartTemp = [];
                cartTemp.push(data);
                localStorage.setItem("carts", JSON.stringify(cartTemp)); // save
            }
            setLocalCartState(!localCartState);
        }
    }

    return (
        <div className="main">
            <div className="productDetail_main">
                <div className="productDetail_container">
                    <div className="productDetail_img">
                        <img src={productStore?.data?.avatar} alt="" />
                    </div>
                    <div className="productDetail_content">
                        <div className="product_name">
                            <h2>
                                {productStore.data != null
                                    ? productStore.data.name
                                    : ""}
                            </h2>
                        </div>
                        <div className="product_note">
                            <label htmlFor="note">Ghi chú</label>
                            <textarea
                                id="note"
                                cols="30"
                                rows="10"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="product_addToCart">
                            <div className="product_title_quantity">
                                <p>Quantity :</p>
                            </div>
                            <div className="product_option">
                                <div className="product_quantity">
                                    <i
                                        onClick={() => {
                                            if (quantity <= 1) {
                                                setQuantity(quantity);
                                            } else {
                                                setQuantity(
                                                    (quantity) => quantity - 1
                                                );
                                            }
                                        }}
                                        className="fa-solid fa-minus"
                                    ></i>
                                    <span>{quantity}</span>
                                    <i
                                        onClick={() => {
                                            setQuantity(quantity + 1);
                                        }}
                                        className="fa-solid fa-plus"
                                    ></i>
                                </div>
                                <div className="product_total">
                                    <span>
                                        {productStore.data != null
                                            ? productStore.data.price
                                            : ""}
                                    </span>
                                </div>
                            </div>
                            <div className="add_btn">
                                <span
                                    onClick={() => {
                                        addToCart();
                                    }}
                                >
                                    Add to cart
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
}
