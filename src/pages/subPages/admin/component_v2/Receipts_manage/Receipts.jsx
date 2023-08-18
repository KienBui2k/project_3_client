import React, { useEffect, useState } from "react";
import axios from "axios";
import ReceiptDetail from "./detail/ReceiptDetail";
export default function Receipts() {
    const [listReceipts, setListReceipts] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const [popData, setPopData] = useState([]);
    try {
        useEffect(() => {
            axios
                .get("http://localhost:4000/apis/v1/receipts")
                .then((res) => {
                    console.log("res fanfjn ădaw", res.data.data);
                    setListReceipts(res.data.data);
                })
                .catch((err) => {
                    console.log("err", err);
                });
        }, []);
    } catch (err) {
        // console.log("err", err);
    }

    return (
        <>
            {showDetail ? (
                <ReceiptDetail
                    popData={popData}
                    setShowDetail={setShowDetail}
                ></ReceiptDetail>
            ) : (
                <></>
            )}
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">
                            <div className="tableContent">#</div>
                        </th>
                        <th scope="col">
                            <div className="tableContent">Receipit Code</div>
                        </th>
                        <th scope="col">
                            <div className="tableContent">Total</div>
                        </th>
                        <th scope="col">
                            <div className="tableContent">Paid</div>
                        </th>
                        <th scope="col">
                            <div className="tableContent">pay mode</div>
                        </th>
                        <th scope="col">
                            <div className="tableContent">create_at</div>
                        </th>
                        <th scope="col">
                            <div className="tableContent">user id</div>
                        </th>
                        <th scope="col">
                            <div className="tableContent">Chi tiết</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {listReceipts?.length === 0 ? (
                        <tr>
                            <td colSpan="8">
                                <div className="tableContent">
                                    không có đơn hàng nào
                                </div>
                            </td>
                        </tr>
                    ) : (
                        listReceipts?.map((receipt, index) => (
                            <tr key={Date.now() * Math.random()}>
                                <th scope="col">
                                    <div className="tableContent">
                                        {index + 1}
                                    </div>
                                </th>
                                <td scope="col">
                                    <div className="tableContent">
                                        {receipt.receipt_code}
                                    </div>
                                </td>
                                <td scope="col">
                                    <div
                                        className="tableContent"
                                        style={{ color: "red" }}
                                    >
                                        {receipt.total}
                                    </div>
                                </td>
                                <td scope="col">
                                    <div className="tableContent">
                                        {receipt.paid ? "Paid" : "Un paid"}
                                    </div>
                                </td>
                                <td scope="col">
                                    <div className="tableContent">
                                        {receipt.pay_mode}
                                    </div>
                                </td>
                                <td scope="col">
                                    <div className="tableContent">
                                        {receipt.update_at}
                                    </div>
                                </td>
                                <td scope="col">
                                    <div className="tableContent">
                                        {receipt.user.user_name}
                                    </div>
                                </td>
                                <td scope="col">
                                    <div className="tableContent">
                                        <button
                                            onClick={() => {
                                                setShowDetail(true);
                                                setPopData(
                                                    receipt.receipt_details
                                                );
                                            }}
                                            type="button"
                                            className="btn btn-primary"
                                        >
                                            Chi tiết
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                    {/* <tr>
                        <th scope="col">
                            <div className="tableContent">1</div>
                        </th>
                        <td scope="col">
                            <div className="tableContent">fsef</div>
                        </td>
                        <td scope="col">
                            <div className="tableContent">đâ</div>
                        </td>
                        <td scope="col">
                            <div className="tableContent">đă</div>
                        </td>
                        <td scope="col">
                            <div className="tableContent">đă</div>
                        </td>
                        <td scope="col">
                            <div className="tableContent">đă</div>
                        </td>
                        <td scope="col">
                            <div className="tableContent">đă</div>
                        </td>
                        <td scope="col">
                            <div className="tableContent">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                >
                                    Chi tiết
                                </button>
                            </div>
                        </td>
                    </tr> */}
                </tbody>
            </table>
        </>
    );
}
