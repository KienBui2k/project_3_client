import React, { useContext, useEffect, useState } from "react";
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from "mdb-react-ui-kit";
import "./CheckOut.scss";
import { RootContext } from "../../../App";
import axios from "axios";
import Qr from "../qrs/Qr";
import { message } from "antd";
import { convertToUSD } from "@mieuteacher/meomeojs";
// {
//     cartTotal, cartItems;
// }
export default function CheckOut() {
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);

    const { cartStore, userStore } = useContext(RootContext);
    const [cartItems, setCartItems] = useState(null);
    const [qrShow, setQrShow] = useState(false);
    const [qrData, setQrData] = useState(null);
    useEffect(() => {
        if (cartStore.data) {
            setCartItems(cartStore.data?.cart_details);
        }
    }, [cartStore.data]);
    console.log("cartStore", cartStore);
    console.log("cartItems", cartItems);
    // return;
    function saveReceipt(eventForm) {
        /* Reset Form Action */
        eventForm.preventDefault();

        /* Req.body.receiptInfor */
        let receiptInfor = {
            receipt_code: cartStore.data.id,
            total: cartStore.data.cart_details.reduce((result, nextItem) => {
                return (result += nextItem.quantity * nextItem.product.price);
            }, 0),
            pay_mode: eventForm.target.payment.value,
            paid: eventForm.target.payment.value == "CASH" ? false : true,
        };
        /* Req.body.receiptDetails */
        let receiptDetails = [];
        for (let i in cartStore.data.cart_details) {
            receiptDetails.push({
                product_id: cartStore.data.cart_details[i].product_id,
                quantity: cartStore.data.cart_details[i].quantity,
                note: cartStore.data.cart_details[i].note,
            });
        }

        /* Cash */
        axios
            .post("http://localhost:4000/apis/v1/purchase/order", {
                receiptInfor,
                receiptDetails,
            })
            .then((res) => {
                message.success("Cảm ơn bạn đã mua hàng!");
                // chuyển trang receipt
                console.log("Đã save receipt", res.data);
            })
            .catch((err) => {
                alert("bala");
            });
        return;
    }
    function checkOut(eventForm) {
        /* Zalo */
        if (eventForm.target.payment.value == "ZALO") {
            axios
                .post("http://localhost:4000/apis/v1/purchase/zalo-create", {
                    receiptCode: cartStore.data.id,
                    receiptTotal: cartStore.data.cart_details.reduce(
                        (result, nextItem) => {
                            return (result +=
                                nextItem.quantity * nextItem.product.price);
                        },
                        0
                    ),
                    userName:
                        userStore.data.first_name + userStore.data.last_name,
                })
                .then((res) => {
                    if (res.status == 200) {
                        /* 
                        - khi thành công sẽ nhận được QR code
                        - orderId, url
                        - Lặp vô tận trong 5 phút liên tục kiểm tra tiền đã vào túi chưa.
                        - show QRCODE
                        */
                        setQrData({
                            url: res.data.url,
                            title: `Scan with ZaloPay`,
                            orderId: res.data.orderId,
                        });
                        setQrShow(true);
                        /* 
                            Check kết quả giao dịch
                        */
                        let tradeInterval;
                        let cancelTrade = setTimeout(() => {
                            // sau 10' hủy giao dịch (600000)
                            clearInterval(tradeInterval);
                            setQrShow(false);
                            setQrData(null);
                            alert("Giao dịch đã bị hủy vì quá lâu!");
                        }, 60000);
                        tradeInterval = setInterval(() => {
                            //console.log("đang kiểm tra thanh toán mỗi 5s");
                            axios
                                .get(
                                    `http://localhost:4000/apis/v1/purchase/zalo-confirm/${res.data.orderId}`
                                )
                                .then((checkRes) => {
                                    if (checkRes.status == 200) {
                                        // chuyển qua trang hóa đơn
                                        clearInterval(tradeInterval);
                                        // thu hồi QR
                                        setQrShow(false);
                                        setQrData(null);
                                        clearTimeout(cancelTrade);
                                        // xử lý database
                                        saveReceipt(eventForm);
                                    }
                                })
                                .catch((err) => {
                                    alert("zalo sập!");
                                });
                        }, 5000);
                    }
                })
                .catch((err) => {
                    console.log("err", err);
                    alert("Tạm thời không thể thanh toán phương thức này!");
                });
            return;
        } else {
            saveReceipt(eventForm);
        }
    }
    return (
        <>
            <MDBBtn onClick={toggleShow}>CHECK OUT</MDBBtn>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
                <MDBModalDialog>
                    <MDBModalContent
                        style={{
                            position: "relative",
                            top: "80px",
                            right: "92%",
                            width: "1400px",
                            minHeight: "500px",
                            // height: "auto",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <MDBModalHeader
                            style={{
                                width: "100%",
                                height: "80px",
                                display: "flex",
                                alignItems: "flex-end",
                                position: "relative",
                            }}
                        >
                            <MDBModalTitle
                                style={{
                                    color: "black",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <h1
                                    style={{
                                        marginTop: "10px",
                                        marginLeft: "52px",
                                    }}
                                >
                                    Check Out Page
                                </h1>
                            </MDBModalTitle>
                            <MDBBtn
                                style={{
                                    position: "absolute",
                                    right: "60px",
                                    top: "24px",
                                    fontSize: "28px",
                                    transition: "transform 0.3s, color 0.3s",
                                    cursor: "pointer",
                                }}
                                className="btn-close"
                                color="none"
                                onClick={toggleShow}
                            ></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody
                            style={{
                                width: "88%",
                                minHeight: "600px",
                                minHeight: "400px",
                                padding: "0",
                            }}
                        >
                            <div
                                className="main_checkOut"
                                style={{
                                    width: "100%",
                                    minHeight: "600px",
                                    backgroundColor: "rgb(0, 21, 41)",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "12px",
                                }}
                            >
                                <div className="container_checkOut">
                                    <div className="info_checkOut">
                                        <div
                                            onSubmit={(eventForm) => {
                                                eventForm.preventDefault();
                                            }}
                                            className="info_user"
                                        >
                                            <div className="group_form">
                                                <div className="label-wrapper">
                                                    <label htmlFor="">
                                                        Name :
                                                    </label>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Name..."
                                                />
                                            </div>
                                            <div className="group_form">
                                                <div className="label-wrapper">
                                                    <label htmlFor="">
                                                        Số Điện thoại :
                                                    </label>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    placeholder=" Số Điện thoại..."
                                                />
                                            </div>
                                            <div className="group_form">
                                                <div className="label-wrapper">
                                                    <label htmlFor="">
                                                        Email :
                                                    </label>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="email"
                                                    placeholder="Email..."
                                                />
                                            </div>
                                            <div className="group_form">
                                                <div className="label-wrapper">
                                                    <label htmlFor="">
                                                        Địa chỉ :
                                                    </label>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    placeholder="Address..."
                                                />
                                            </div>
                                            {qrShow && qrData != null ? (
                                                <Qr {...qrData} />
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                        <div className="payment">
                                            <form
                                                onSubmit={(eventForm) => {
                                                    checkOut(eventForm);
                                                }}
                                                className="payment_method"
                                            >
                                                <div className="payment_name">
                                                    <p>Payment methods</p>
                                                </div>
                                                <div className="payment_option">
                                                    <input
                                                        type="radio"
                                                        name="payment"
                                                        value="CASH"
                                                    />
                                                    <span>Cash</span>
                                                    <br />
                                                    <input
                                                        className="zalo"
                                                        type="radio"
                                                        name="payment"
                                                        value="ZALO"
                                                    />
                                                    <span> Zalo</span>
                                                    <br />
                                                    <input
                                                        type="radio"
                                                        name="payment"
                                                        value="MOMO"
                                                    />
                                                    <span>Momo</span>
                                                </div>
                                            </form>
                                            <div className="payment_img">
                                                <img
                                                    src="../images/payment.png"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product_checkOut">
                                        <div className="list_product_scrollable">
                                            {" "}
                                            <div className="list_product">
                                                {cartItems?.length === 0 ? (
                                                    <p className="empty_cart_message">
                                                        Không có hàng trong giỏ
                                                    </p>
                                                ) : (
                                                    cartItems?.map(
                                                        (item) => (
                                                            console.log(item),
                                                            (
                                                                <div className="item_product">
                                                                    <div className="item_img">
                                                                        <img
                                                                            src={
                                                                                item
                                                                                    .product
                                                                                    .avatar
                                                                            }
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                    <div className="item_info">
                                                                        <span>
                                                                            Name:{" "}
                                                                            {
                                                                                item
                                                                                    .product
                                                                                    .name
                                                                            }
                                                                        </span>

                                                                        <span>
                                                                            price
                                                                            :{" "}
                                                                            {
                                                                                item
                                                                                    .product
                                                                                    .price
                                                                            }
                                                                        </span>

                                                                        <span>
                                                                            quantity
                                                                            :{" "}
                                                                            {
                                                                                item.quantity
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            )
                                                        )
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        <div className="check_btn">
                                            <div className="back_btn_ctn">
                                                <span className="back_btn">
                                                    Tiếp Tục Mua Hàng
                                                    {/* {cartItems
                                                        ? convertToUSD(
                                                              cartItems?.reduce(
                                                                  (
                                                                      value,
                                                                      nextItem
                                                                  ) => {
                                                                      return (value +=
                                                                          nextItem.quantity *
                                                                          nextItem
                                                                              .product
                                                                              .price);
                                                                  },
                                                                  0
                                                              )
                                                          )
                                                        : 0} */}
                                                </span>
                                            </div>
                                            <div className="checkOut_btn_ctn">
                                                <span
                                                    typeof="submit"
                                                    className="checkOut_btn"
                                                >
                                                    Check out
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </MDBModalBody>

                        <MDBModalFooter
                            style={{
                                width: "100%",
                                height: "80px",
                                display: "flex",
                                alignItems: "flex-end",
                                position: "relative",
                            }}
                        >
                            <MDBBtn
                                style={{
                                    position: "absolute",
                                    right: "32px",
                                    bottom: "20px",
                                }}
                                color="secondary"
                                onClick={toggleShow}
                            >
                                Close
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}
