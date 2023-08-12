import React, { useRef, useState, useEffect } from "react";
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
import "./NewEdit.scss";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";

export default function NewEdit({ productEdit, setListProducts }) {
    const navigate = useNavigate();
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

    const [basicModal, setBasicModal] = useState(false);

    const toggleShow = () => setBasicModal(!basicModal);

    const urlPreviewRef = useRef();
    const [editAvatar, setEditAvatar] = useState(null);
    const [newAvatar, setNewAvatar] = useState(null);
    useEffect(() => {
        setEditAvatar(productEdit?.avatar);
    }, [productEdit]);
    // console.log("check edit", productEdit?.id);

    return (
        <>
            <MDBBtn onClick={toggleShow}>Edit</MDBBtn>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
                <MDBModalDialog>
                    <MDBModalContent
                        style={{
                            position: "relative",
                            top: "65px",
                            right: "70%",
                            width: "1200px",
                            height: "750px",
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
                                <h1 style={{ marginTop: "10px" }}>
                                    Edit Product Form
                                </h1>
                            </MDBModalTitle>
                            <MDBBtn
                                style={{
                                    position: "absolute",
                                    right: "40px",
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
                                width: "1152px",
                                height: "600px",
                                maxHeight: "600px",
                                padding: "0",
                            }}
                        >
                            <div
                                className="edit_product_main"
                                style={{
                                    width: "100%",
                                    height: "600px",
                                    backgroundColor: "rgb(0, 21, 41)",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "12px",
                                }}
                            >
                                <form
                                    onSubmit={async (eventForm) => {
                                        eventForm.preventDefault();
                                        let newProductInfor = {
                                            name: eventForm.target.name.value,
                                            des: eventForm.target.des.value,
                                            price: Number(
                                                eventForm.target.price.value
                                            ),
                                            active: Number(
                                                eventForm.target.active.value
                                            ),
                                        };
                                        let newProductAvatar;
                                        if (newAvatar) {
                                            newProductAvatar =
                                                eventForm.target.avatar
                                                    .files[0];
                                        }
                                        // console.log(
                                        //     "newProductAvatar",
                                        //     newProductAvatar
                                        // );
                                        // return;
                                        let fakeForm = new FormData();

                                        fakeForm.append(
                                            "product_infor",
                                            JSON.stringify(newProductInfor)
                                        );

                                        if (newProductAvatar) {
                                            fakeForm.append(
                                                "imgs",
                                                newProductAvatar
                                            );
                                        } else {
                                            fakeForm.append("imgs", editAvatar);
                                        }

                                        await axios
                                            .patch(
                                                `http://127.0.0.1:4000/apis/v1/product/${productEdit.id}`,
                                                fakeForm,
                                                {
                                                    headers: {
                                                        "Content-Type":
                                                            "multipart/form-data",
                                                    },
                                                }
                                            )
                                            .then((res) => {
                                                setBasicModal(!basicModal);
                                                axios
                                                    .get(
                                                        "http://127.0.0.1:4000/apis/v1/product"
                                                    )
                                                    .then((res) => {
                                                        setListProducts(
                                                            res.data.data
                                                        );
                                                    });
                                                navigate("/admin.v2/");
                                                toastSuccess(
                                                    "update product successfully!"
                                                );
                                            })
                                            .catch((err) => {
                                                console.log(
                                                    "err 1726dbhabvchjwb u ủ",
                                                    err
                                                );
                                                setBasicModal(!basicModal);
                                                toastError(
                                                    "update product faild!"
                                                );
                                            });
                                        // console.log(
                                        //     "eventForm",
                                        //     eventForm.target.avatar
                                        // );
                                        // console.log(
                                        //     "newProductAvatar",
                                        //     newProductAvatar
                                        // );
                                        // console.log(
                                        //     "newProductInfor",
                                        //     newProductInfor
                                        // );
                                    }}
                                    className="edit_product_container"
                                >
                                    <div className="product_edit_img">
                                        <input
                                            onChange={(event) => {
                                                let blobUrl =
                                                    URL.createObjectURL(
                                                        event.target.files[0]
                                                    );
                                                urlPreviewRef.current.src =
                                                    blobUrl;
                                                if (blobUrl !== editAvatar) {
                                                    setNewAvatar(blobUrl);
                                                }
                                            }}
                                            name="avatar"
                                            type="file"
                                        />
                                        <div className="edit_img">
                                            <img
                                                ref={urlPreviewRef}
                                                src={productEdit?.avatar}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="edit_content">
                                        <div className="edit_product">
                                            <div className="group_form">
                                                <div className="label-wrapper">
                                                    <label>
                                                        Product Name :
                                                    </label>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Name..."
                                                    defaultValue={
                                                        productEdit?.name
                                                    }
                                                />
                                            </div>
                                            <div className="group_form">
                                                <div className="label-wrapper">
                                                    <label htmlFor="">
                                                        Price :
                                                    </label>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="price"
                                                    placeholder="Price..."
                                                    defaultValue={
                                                        productEdit?.price
                                                    }
                                                />
                                            </div>
                                            <div className="group_form">
                                                <div className="label-wrapper">
                                                    <label htmlFor="">
                                                        description :
                                                    </label>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="des"
                                                    placeholder="Description..."
                                                    defaultValue={
                                                        productEdit?.des
                                                    }
                                                />
                                            </div>
                                            <div className="group_form_select">
                                                <div className="group_form_two">
                                                    <div className="label-wrapper">
                                                        <label htmlFor="">
                                                            Active :
                                                        </label>
                                                    </div>
                                                    <select
                                                        name="active"
                                                        defaultValue={
                                                            productEdit?.active
                                                                ? "ON"
                                                                : "OFF"
                                                        }
                                                    >
                                                        <option value="1">
                                                            ON
                                                        </option>
                                                        <option value="0">
                                                            OFF
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            typeof="submit"
                                            className="btn_edit"
                                        >
                                            <button>Save</button>
                                        </div>
                                    </div>
                                </form>
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
                            <MDBBtn
                                style={{
                                    position: "absolute",
                                    right: "124px",
                                    bottom: "20px",
                                }}
                            >
                                Save changes
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            <Toaster />
        </>
    );
}
