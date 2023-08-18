import React, { useContext, useState } from "react";
import "./CartItem.scss";
import { RootContext } from "../../../../App";
import api from "../../../../services/api";

export default function CartItem({ setCartTimes, item }) {
    const totalPrice = item.product.price * item.quantity;
    const {
        userStore,
        cartActions,
        dispatch,
        localCartState,
        setLocalCartState,
    } = useContext(RootContext);
    const [quantity, setQuantity] = useState(item.quantity);
    const [newQuantity, setNewQuantity] = useState(item.quantity);

    function handleDele(id) {
        if (!localStorage.getItem("token")) {
            if (localStorage.getItem("carts")) {
                let carts = JSON.parse(localStorage.getItem("carts"));
                carts = carts.filter((item) => item.product_id != id);
                localStorage.setItem("carts", JSON.stringify(carts)); // save
                setLocalCartState(!localCartState); // reload ui
            }
        }
        // if (window.confirm("ban co muon xoa san pham nay khoong")) {
        api.purchase.deleteProduct(id).then((res) => {
            if (res.status == 200) {
                dispatch(cartActions.deleteProduct(id));
            } else {
            }
        });
        // }
    }
    function updateCart(typeBtn) {
        console.log("typeBtn", typeBtn);
        if (!localStorage.getItem("token")) {
            if (localStorage.getItem("carts")) {
                let carts = JSON.parse(localStorage.getItem("carts"));
                if (typeBtn == "-") {
                    for (let i in carts) {
                        if (carts[i].product_id == item.product_id) {
                            if (quantity == 1) {
                                carts.splice(i, 1);
                            } else {
                                carts[i].quantity -= 1;
                            }
                        }
                        localStorage.setItem("carts", JSON.stringify(carts));
                    }
                } else {
                    carts = carts.map((itemMap) => {
                        if (itemMap.product_id == item.product_id) {
                            itemMap.quantity += 1;
                        }
                        return itemMap;
                    });
                    localStorage.setItem("carts", JSON.stringify(carts));
                }
                setLocalCartState(!localCartState);
            }
            return;
        }
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
                <img src={item.product?.avatar} alt="" />
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
            <div
                onClick={() =>
                    handleDele(
                        item.id == undefined ? item.product_id : item.id,
                        0
                    )
                }
                className="delete_item"
            >
                <span>X</span>
            </div>
        </div>
    );
}
