import React, { useEffect } from "react";
import "./ReceiptDetail.scss";
// import { convertToUSD } from "@mieuteacher/meomeojs";
export default function ReceiptDetail(props) {
    //useEffect(() => {}, []);
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

                {props.popData.map((item, index) => (
                    <div
                        key={Date.now() * Math.random()}
                        className="informationLine"
                    >
                        <div className="informationLine_product">
                            <img src={item.product.avatar} />
                            <div className="informationLine_text">
                                <h4>{item.product.name} </h4>
                                <p>{item.product.price} </p>
                                <p>{item.quantity}</p>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="informationLine_total_price">
                    <h1>Total:</h1>
                    <p>53</p>
                </div>
            </div>
        </div>
    );
}
