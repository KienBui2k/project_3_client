import React, { useEffect } from "react";
import "./ReceiptDetail.scss";
// import { convertToUSD } from "@mieuteacher/meomeojs";
export default function ReceiptDetail(props) {
    //useEffect(() => {}, []);
    const calculateTotalPrice = () => {
        return props.popData.reduce((total, item) => {
            return total + item.product.price * item.quantity;
        }, 0);
    };
    return (
        <div className="opacity">
            <div className="receiptDetail_container">
                <h5
                    onClick={() => {
                        props.setShowDetail(false);
                    }}
                >
                    X
                </h5>
                <div className="sub_receipts">
                    {props.popData.map((item, index) => (
                        <div
                            key={Date.now() * Math.random()}
                            className="informationLine"
                        >
                            <div className="informationLine_product">
                                <img src={item.product.avatar} />
                            </div>
                            <div className="informationLine_text">
                                <h4>{item.product.name} </h4>
                                <p>
                                    Price : <span>{item.note} </span>
                                </p>
                                <p>
                                    Quantity : <span> {item.quantity}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="informationLine_total_price">
                    <h4>Total:</h4>
                    <p>{calculateTotalPrice()} :VNĐ </p>
                </div>
            </div>
        </div>
    );
}
