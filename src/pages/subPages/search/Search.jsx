import React, { useState } from "react";
import "./Search.scss";

export default function Search() {
    return (
        <div className="search_main">
            <div className="search_container">
                <div className="search_header">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value=""
                    />
                    <button className="search_button">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
                <div className="search_content">
                    <div className="product_item">
                        <div className="product_image">
                            <img src="../images/about-img.png" alt="" />
                        </div>
                        <div className="product_name">san phảm 1 najkfn</div>
                    </div>
                    <div className="product_item">
                        <div className="product_image">
                            <img src="../images/about-img.png" alt="" />
                        </div>
                        <div className="product_name">san phảm 1 najkfn</div>
                    </div>
                    <div className="product_item">
                        <div className="product_image">
                            <img src="../images/about-img.png" alt="" />
                        </div>
                        <div className="product_name">san phảm 1 najkfn</div>
                    </div>
                    <div className="product_item">
                        <div className="product_image">
                            <img src="../images/about-img.png" alt="" />
                        </div>
                        <div className="product_name">san phảm 1 najkfn</div>
                    </div>
                    <div className="product_item">
                        <div className="product_image">
                            <img src="../images/about-img.png" alt="" />
                        </div>
                        <div className="product_name">san phảm 1 najkfn</div>
                    </div>
                    <div className="product_item">
                        <div className="product_image">
                            <img src="../images/about-img.png" alt="" />
                        </div>
                        <div className="product_name">san phảm 1 najkfn</div>
                    </div>
                    <div className="product_item">
                        <div className="product_image">
                            <img src="../images/about-img.png" alt="" />
                        </div>
                        <div className="product_name">san phảm 1 najkfn</div>
                    </div>
                    <div className="product_item">
                        <div className="product_image">
                            <img src="../images/about-img.png" alt="" />
                        </div>
                        <div className="product_name">san phảm 1 najkfn</div>
                    </div>
                    <div className="product_item">
                        <div className="product_image">
                            <img src="../images/about-img.png" alt="" />
                        </div>
                        <div className="product_name">san phảm 1 najkfn</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
