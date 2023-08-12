import React, { useEffect, useRef, useState } from "react";
import "./Product_manage.scss";
import axios from "axios";
import NewEdit from "../newEdit/NewEdit";
export default function Product_manage() {
    const [listProducts, setListProducts] = useState([]);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:4000/apis/v1/product")
            .then((res) => {
                setListProducts(res.data.data);
            })
            .catch((err) => {
                console.log("catch", err);
            });
    }, []);
    const [productEdit, setProductEdit] = useState(null);
    return (
        <div className="product_manage">
            <div className="product_container">
                <table>
                    <thead>
                        <th style={{ width: "4%" }}>STT</th>
                        <th style={{ width: "25%" }}>Images</th>
                        <th style={{ width: "15%" }}>Name</th>
                        <th style={{ width: "6%" }}>Price</th>
                        <th style={{ width: "28%" }}>Description</th>
                        <th style={{ width: "10%" }}>Action</th>
                        <th style={{ width: "12%" }}>Option</th>
                    </thead>
                    <tbody>
                        {listProducts?.map((product, index) => (
                            <tr key={Date.now * Math.random()}>
                                <td style={{ width: "4%" }}>{index + 1}</td>
                                <td
                                    style={{ width: "15%" }}
                                    className="image-cell"
                                >
                                    <div className="product-img">
                                        <img src={product.avatar} alt="" />
                                    </div>
                                </td>
                                <td style={{ width: "16%" }}>{product.name}</td>
                                <td style={{ width: "11%" }}>
                                    {product.price}
                                </td>
                                <td style={{ width: "26%" }}>{product.des}</td>
                                <td style={{ width: "10%" }}>
                                    {product.active ? "ON" : "OFF"}
                                </td>
                                <td style={{ width: "18%" }}>
                                    <span
                                        type="button"
                                        data-toggle="modal"
                                        data-target="#exampleModal"
                                        onClick={() => setProductEdit(product)}
                                    >
                                        <NewEdit
                                            productEdit={productEdit}
                                            setListProducts={setListProducts}
                                        ></NewEdit>
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
