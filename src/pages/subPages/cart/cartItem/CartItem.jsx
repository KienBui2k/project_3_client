import React, { useContext, useState } from "react";
import "./CartItem.scss";
import { RootContext } from "../../../../App";
import api from "../../../../services/api";

export default function CartItem({ item }) {
    const totalPrice = item.product.price * item.quantity;
    const { userStore, cartActions, dispatch } = useContext(RootContext);
    const [quantity, setQuantity] = useState(item.quantity);
    const [newQuantity, setNewQuantity] = useState(item.quantity);
    function handleDele(product_id) {
        // if (window.confirm("ban co muon xoa san pham nay khoong")) {
        api.purchase.deleteProduct(product_id).then((res) => {
            if (res.status == 200) {
                dispatch(cartActions.deleteProduct(product_id));
            } else {
            }
        });
        // }
    }
    function updateCart(typeBtn) {
        if (typeBtn == "-") {
            if (quantity == 1) {
                if (confirm("xóa ok!")) {
                    api.purchase
                        .updateCart(userStore?.data?.id, {
                            type: 0,
                            cart_detail_record_edited: {
                                id: item.id,
                            },
                        })
                        .then((res) => {
                            api.purchase
                                .findCart(userStore.data?.id)
                                .then((res) => {
                                    if (res.status == 200) {
                                        dispatch(
                                            cartActions.setCartData(
                                                res.data?.data
                                            )
                                        );
                                    } else {
                                        alert("error");
                                    }
                                })
                                .catch((err) => {
                                    alert("sap !");
                                });
                        })
                        .catch((err) => {
                            alert("error!");
                        });
                }
            }
            console.log("da vao day", quantity);
            api.purchase
                .updateCart(userStore?.data?.id, {
                    type: 1,
                    cart_detail_record_edited: {
                        id: item.id,
                        quantity: quantity - 1,
                    },
                })
                .then((res) => {
                    console.log("da vao day nek ");
                    api.purchase
                        .findCart(userStore.data?.id)
                        .then((res) => {
                            if (res.status == 200) {
                                dispatch(
                                    cartActions.setCartData(res.data?.data)
                                );
                            } else {
                                alert("error 1");
                            }
                        })
                        .catch((err) => {
                            alert("sap !");
                        });
                })
                .catch((err) => {
                    alert("error! 2");
                });
        } else {
            api.purchase
                .updateCart(userStore?.data?.id, {
                    type: 1,
                    cart_detail_record_edited: {
                        id: item.id,
                        quantity: quantity + 1,
                    },
                })
                .then((res) => {
                    api.purchase
                        .findCart(userStore.data?.id)
                        .then((res) => {
                            if (res.status == 200) {
                                dispatch(
                                    cartActions.setCartData(res.data?.data)
                                );
                            } else {
                                alert("error 3");
                            }
                        })
                        .catch((err) => {
                            alert("sap !");
                        });
                })
                .catch((err) => {
                    alert("error! 4");
                });
        }
    }

    return (
        <div className="cart_item">
            <div className="cart_item_img">
                <img src="./images/about-img.png" alt="" />
            </div>
            <div className="cart_item_info">
                <p>{item.product?.name}</p>
                <div className="cart_quantity">
                    <i
                        onClick={() => {
                            updateCart("-");
                        }}
                        className="fa-solid fa-minus"
                    ></i>
                    <span>{quantity}</span>
                    <i
                        onClick={() => {
                            updateCart("+");
                        }}
                        className="fa-solid fa-plus"
                    ></i>
                </div>
            </div>
            <div className="cart_item_total">
                <h4>{totalPrice} $</h4>
            </div>
            <div onClick={() => handleDele(item.id)} className="delete_item">
                <span>X</span>
            </div>
        </div>
    );
}
