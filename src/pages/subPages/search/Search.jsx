import React, { useState } from "react";
import "./Search.scss";
import api from "@api";

import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { convertToUSD } from "@mieuteacher/meomeojs";
import { useNavigate } from "react-router";

export default function Search() {
    const navigate = useNavigate();
    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 24,
            }}
            spin
        />
    );
    let timeOut; // tạo ra 1 biến để lưu timeout
    const [searchStatus, setSearchStatus] = useState(false);
    const [searchData, setSearchData] = useState([]);
    function searchProductByName(e) {
        clearTimeout(timeOut); // việc đầu tiên khi on change là remove timeout sắp diễn ra.
        if (e.target.value == "") {
            setSearchData([]);
            return;
        }
        // ghi đè timeout thành 1 time out mới  => nếu không onchange nữa thì sẽ không bị clear và sẽ diễn ra nội dung bên trong timeout
        timeOut = setTimeout(async () => {
            // call api
            setSearchStatus(true);
            try {
                if (searchStatus) {
                    return;
                }
                let result = await api.products.search(e.target.value);
                if (result.status == 200) {
                    // ok sau 1.5s thì update data và tắt hiệu ứng
                    setTimeout(() => {
                        setSearchStatus(false);
                        setSearchData(result.data.data);
                    }, 1500);
                } else {
                    // failed
                }
            } catch (err) {
                // lỗi call api
            }
        }, 700); // sau 700 ms không gõ thì thực thi
    }
    console.log("searchData", searchData);
    console.log("searchStatus", searchStatus);
    return (
        <div className="search_main">
            <div className="search_container">
                <div className="search_header">
                    <input
                        type="text"
                        placeholder="Search products..."
                        onChange={(e) => {
                            searchProductByName(e);
                        }}
                    />
                    <button className="search_button">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
                <div className="search_content">
                    {searchData?.length > 0 ? (
                        searchData?.map((product, index) => (
                            // console.log("product", product),
                            <div
                                key={Date.now() * Math.random()}
                                className="product_item"
                            >
                                <div className="product_image">
                                    <img src={product.avatar} alt="" />
                                </div>
                                <div className="product_name">
                                    {product.name}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div
                            style={{
                                textAlign: "center",
                                fontSize: "25px",
                                fontWeight: "bold",
                            }}
                        >
                            Not product found!
                        </div>
                    )}
                </div>
                {searchStatus ? (
                    <div className="loading">
                        <Spin indicator="https://png.pngtree.com/png-vector/20200224/ourmid/pngtree-colorful-loading-icon-png-image_2152960.jpg" />
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
