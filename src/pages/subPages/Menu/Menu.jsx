import React, { useEffect, useState } from "react";
import "./Menu.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import MenuItem from "./MenuItem/MenuItem";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../../../stores/slices/category";
export default function Menu() {
    useEffect(() => {
        // Khởi tạo thư viện AOS
        AOS.init();
    }, []);

    const { category } = useParams();
    // console.log("category", category);

    const dispatch = useDispatch();

    const categoryStore = useSelector((store) => store.categoryStore);
    const [timeDelay, setTimeDelay] = useState(200);
    useEffect(() => {
        if (category == "combo") {
            dispatch(categoryActions.findByCategory(1));
        }
        if (category == "pizza") {
            dispatch(categoryActions.findByCategory(2));
        }
        if (category == "burger") {
            dispatch(categoryActions.findByCategory(3));
        }
        if (category == "chicken") {
            dispatch(categoryActions.findByCategory(4));
        }
        if (category == "drink") {
            dispatch(categoryActions.findByCategory(5));
        }
    }, [category]);

    console.log("check categoryStore", categoryStore);
    return (
        <div className="menu_main">
            <div className="menu_container">
                <div
                    data-aos="fade-up"
                    data-aos-delay="400"
                    className="menu_heading"
                >
                    <img src="../images/titulo-encabezado.png" alt="" />
                    <h3>menu</h3>
                </div>

                <div className="menu_list">
                    {categoryStore?.data?.map((product, index) => {
                        const currentItemDelay = timeDelay + index * 400;
                        return (
                            <MenuItem
                                product={product}
                                timeDelay={currentItemDelay}
                                key={index}
                            ></MenuItem>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
