import React, { useEffect, useState, useContext } from "react";
import "./Cart.scss";
import { RootContext } from "@/App";
import CartItem from "./cartItem/CartItem";
import api from "@api";

export default function Cart() {
    const { cartStore, localCartState, setLocalCartState } =
        useContext(RootContext);

    const [cartItems, setCartTimes] = useState([]);

    useEffect(() => {
        if (cartStore.data) {
            setCartTimes(cartStore.data?.cart_details);
        }
    }, [cartStore.data]);

    const cartTotal = cartStore.data?.cart_details?.reduce((total, product) => {
        return total + product.quantity;
    }, 0);

    const subTotal = cartStore?.data?.cart_details?.reduce((total, product) => {
        return total + product.quantity * Number(product.product.price);
    }, 0);

    async function generateDataCart() {
        let carts = JSON.parse(localStorage.getItem("carts"));

        for (let i in carts) {
            console.log("carts carts", carts[i]);
            carts[i].product = await api.products
                .findProductById(carts[i].product_id)
                .then((res) => res.data.data);
        }
        setCartTimes(carts);
    }

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            if (localStorage.getItem("carts")) {
                generateDataCart();
            }
        }
    }, [localCartState]);

    return (
        <>
            <div className="cart_main">
                <div className="cart_container">
                    {cartItems?.length == undefined ||
                    cartItems?.length == 0 ? (
                        <p className="empty_cart_message">
                            Không có hàng trong giỏ
                        </p>
                    ) : (
                        cartItems?.map((item) => (
                            <CartItem
                                key={Date.now() * Math.random()}
                                item={item}
                                setCartTimes={setCartTimes}
                            />
                        ))
                    )}

                    {cartItems?.length > 0 ? (
                        <div className="check_out">
                            <div className="checkOut_info">
                                <span>Tổng sản phẩm : {subTotal}</span>
                                <br />
                                <span>Tổng tiền : {cartTotal}</span>
                            </div>
                            <div
                                onClick={() => {
                                    window.location.href = "/payment";
                                }}
                                className="checkOut_btn"
                            >
                                Check Out
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </>
    );
}
