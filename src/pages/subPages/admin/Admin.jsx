import React, { useState } from "react";
import "./admin.scss";
const Admin = () => {
    const [isNavVisible, setNavVisible] = useState(false);

    const toggleNavbar = () => {
        setNavVisible(!isNavVisible);
    };

    const handleLinkClick = () => {
        // Handle link click, if needed
    };

    return (
        <div>
            <div className="header" id="header">
                <div className="header_toggle">
                    <i
                        className={`bx ${isNavVisible ? "bx-x" : "bx-menu"}`}
                        id="header-toggle"
                        onClick={toggleNavbar}
                    ></i>
                </div>
                <div className="header_img">
                    <img src="https://i.imgur.com/hczKIze.jpg" alt="" />
                </div>
            </div>
            <div
                className={`l-navbar ${isNavVisible ? "show" : ""}`}
                id="nav-bar"
            >
                <nav className="nav">
                    <div>
                        <a href="#" className="nav_logo">
                            <i className="bx bx-layer nav_logo-icon"></i>
                            <span className="nav_logo-name">BBBootstrap</span>
                        </a>
                        <div className="nav_list">
                            <a
                                href="#"
                                className="nav_link active"
                                onClick={handleLinkClick}
                            >
                                <i className="bx bx-grid-alt nav_icon"></i>
                                <span className="nav_name">Dashboard</span>
                            </a>
                            <a
                                href="#"
                                className="nav_link"
                                onClick={handleLinkClick}
                            >
                                <i className="bx bx-user nav_icon"></i>
                                <span className="nav_name">Users</span>
                            </a>
                            <a
                                href="#"
                                className="nav_link"
                                onClick={handleLinkClick}
                            >
                                <i className="bx bx-message-square-detail nav_icon"></i>
                                <span className="nav_name">Messages</span>
                            </a>
                            <a
                                href="#"
                                className="nav_link"
                                onClick={handleLinkClick}
                            >
                                <i className="bx bx-bookmark nav_icon"></i>
                                <span className="nav_name">Bookmark</span>
                            </a>
                            <a
                                href="#"
                                className="nav_link"
                                onClick={handleLinkClick}
                            >
                                <i className="bx bx-folder nav_icon"></i>
                                <span className="nav_name">Files</span>
                            </a>
                            <a
                                href="#"
                                className="nav_link"
                                onClick={handleLinkClick}
                            >
                                <i className="bx bx-bar-chart-alt-2 nav_icon"></i>
                                <span className="nav_name">Stats</span>
                            </a>
                        </div>
                    </div>
                    <div>
                        <a
                            href="#"
                            className="nav_link"
                            onClick={handleLinkClick}
                        >
                            <i className="bx bx-log-out nav_icon"></i>
                            <span className="nav_name">SignOut</span>
                        </a>
                    </div>
                </nav>
            </div>
            <div className="height-100 bg-light">
                <h4>Main Components</h4>
            </div>
        </div>
    );
};

export default Admin;
