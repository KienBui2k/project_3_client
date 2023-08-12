import React, { useContext, useState } from "react";
import { RootContext } from "@/App";
import "./Receipts.scss";
import ReceiptDetail from "../ReceiptDetail/ReceiptDetail";
export default function Receipts() {
    const { receiptStore } = useContext(RootContext);
    console.log(
        "🚀 ~ file: Receipts.jsx:6 ~ Receipts ~ receiptStore:",
        receiptStore
    );
    const [popData, setPopData] = useState([]);
    const [showDetail, setShowDetail] = useState(false);

    return (
        <div className="informationLine_receipts">
            {showDetail ? (
                <ReceiptDetail
                    popData={popData}
                    setShowDetail={setShowDetail}
                ></ReceiptDetail>
            ) : (
                <></>
            )}
            <div className="informationLine_h2">
                <h2>Purchase History</h2>
            </div>
            <div>
                {/* Noi hien thi history */}
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">
                                <div className="tableContent">#</div>
                            </th>
                            <th scope="col">
                                <div className="tableContent">Receipt Id</div>
                            </th>
                            <th scope="col">
                                <div className="tableContent">Total</div>
                            </th>
                            <th scope="col">
                                <div className="tableContent">Paid Status</div>
                            </th>
                            <th scope="col">
                                <div className="tableContent">Paid Mode</div>
                            </th>
                            <th scope="col">
                                <div className="tableContent">Create Time</div>
                            </th>

                            <th scope="col">
                                <div className="tableContent">Detail</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {receiptStore.data?.map((receipt, index) => (
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
                                            Details
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="informationLine_Continue">
                <button>Continue Shopping</button>
            </div>
        </div>
    );
}
