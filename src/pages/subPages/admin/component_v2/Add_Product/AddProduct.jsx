import React, { useEffect, useState } from "react";
import "./addProduct.scss";
import toast, { Toaster } from "react-hot-toast";
import { useRef } from "react";
import axios from "axios";
export default function AddProduct() {
    const toastSuccess = (text) => {
        toast.success(text, {
            position: "top-center",
        });
    };
    const toastError = (text) => {
        toast.error(text, {
            position: "top-center",
        });
    };
    const toastWarning = (text) => {
        toast(text, {
            icon: "⚠️",
            style: {
                color: "#000",
            },
            position: "top-center",
        });
    };

    const urlPreviewRef = useRef();
    const [categories, setCategories] = useState([]);
    try {
        useEffect(() => {
            axios
                .get("http://127.0.0.1:4000/apis/v1/categories")
                .then((res) => {
                    setCategories(res.data.data);
                });
        });
    } catch (err) {}
    return (
        <div className="main">
            <form
                className="add_product_main"
                onSubmit={async (eventForm) => {
                    eventForm.preventDefault();
                    let newProductInfor = {
                        category_id: Number(eventForm.target.category_id.value),
                        name: eventForm.target.name.value,
                        des: eventForm.target.des.value,
                        price: Number(eventForm.target.price.value),
                    };
                    let newProductAvatar = {
                        avatar: eventForm.target.avatar.files[0],
                    };
                    console.log("eventForm", eventForm.target.avatar.files);
                    console.log("newProductAvatar", newProductAvatar.avatar);
                    console.log("newProductInfor", newProductInfor);

                    let fakeForm = new FormData();
                    fakeForm.append("imgs", newProductAvatar.avatar);
                    fakeForm.append(
                        "product_infor",
                        JSON.stringify(newProductInfor)
                    );
    
                    await axios
                        .post(
                            "http://localhost:4000/apis/v1/product",
                            fakeForm,
                            {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                },
                            }
                        )
                        .then((res) => {
                            toastSuccess("add product successfully!");
                        })
                        .catch((err) => {
                            toastError("add product faild!");
                            console.log("err", err);
                        });
                }}
            >
                <div className="add_product_container">
                    <div className="product_add_img">
                        <input
                            onChange={(event) => {
                                if (event.target.files.length == 0) {
                                    toastWarning("Bạn chưa chọn hình");
                                } else {
                                    let blodUrl = URL.createObjectURL(
                                        event.target.files[0]
                                    );
                                    urlPreviewRef.current.src = blodUrl;
                                }
                            }}
                            name="avatar"
                            type="file"
                        />
                        <div className="product_img">
                            <img
                                ref={urlPreviewRef}
                                src="../images/no_images.png"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="product_content">
                        <div className="add_product">
                            <div className="group_form">
                                <label htmlFor="product_name">
                                    Product Name :
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="product_name"
                                    placeholder="Name..."
                                />
                            </div>
                            <div className="group_form">
                                <label htmlFor="product_price">Price :</label>
                                <input
                                    type="text"
                                    name="price"
                                    id="product_price"
                                    placeholder="Price..."
                                />
                            </div>
                            <div className="group_form">
                                <label htmlFor="product_des">
                                    description :
                                </label>
                                <input
                                    type="text"
                                    name="des"
                                    id="product_des"
                                    placeholder="Description..."
                                />
                            </div>
                            <div className="group_form_select">
                                <div className="group_form_two">
                                    <label htmlFor="product_category">
                                        Category :
                                    </label>
                                    <select
                                        name="category_id"
                                        id="product_category"
                                    >
                                        {categories?.map((catrgory, index) => (
                                            <option
                                                key={index}
                                                value={catrgory.id}
                                            >
                                                {catrgory.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div typeof="submit" className="btn_add">
                            <button>Add Product</button>
                        </div>
                    </div>
                </div>
                <Toaster />
            </form>
        </div>
    );
}
