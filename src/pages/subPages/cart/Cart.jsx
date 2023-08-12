import React, { useEffect, useState, useContext } from "react";
import "./Cart.scss";
import { RootContext } from "@/App";
import CartItem from "./cartItem/CartItem";
import { useSelector } from "react-redux";
import CheckOut from "../checkOut/CheckOut";
export default function Cart() {
    const { cartStore } = useContext(RootContext);

    const [cartItems, setCartTimes] = useState([]);

    useEffect(() => {
        if (cartStore.data) {
            setCartTimes(cartStore.data?.cart_details);
        }
    }, [cartStore.data]);
    console.log("ancawaufn", cartStore);
    const cartTotal = cartStore.data?.cart_details?.reduce((total, product) => {
        return total + product.quantity;
    }, 0);

    const subTotal = cartStore?.data?.cart_details?.reduce((total, product) => {
        return total + product.quantity * Number(product.product.price);
    }, 0);
    // console.log("cartStore", cartStore);
    console.log("cartItems", cartItems);
    console.log("cartItems", cartItems.length);
    // return;
    return (
        <>
            <div className="cart_main">
                <div className="cart_container">
                    {cartItems?.length < 1 ? (
                        <p className="empty_cart_message">
                            Không có hàng trong giỏ
                        </p>
                    ) : (
                        cartItems?.map((item) => (
                            <CartItem
                                key={Date.now() * Math.random()}
                                item={item}
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
                                {/* <CheckOut /> */}
                                jjjjjjjj
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
