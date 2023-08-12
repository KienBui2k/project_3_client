import React from "react";
import "./qr.scss";
import { QRCode, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
export default function Qr({ url, title, orderId }) {
    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 24,
            }}
            spin
        />
    );
    return (
        <div className="qr_modal">
            <h2>{title}</h2>
           
            <QRCode
                value={url}
                icon="https://www.taichinhz.com/wp-content/uploads/2021/10/zalopay-la-gi.jpg"
            />
            <Spin indicator={antIcon} />
        </div>
    );
}
