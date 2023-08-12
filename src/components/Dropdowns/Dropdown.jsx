import React from "react";
import "./dropdown.scss";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function DropdownLogout({ userStore }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const handleLogout = () => {
        if (window.confirm(t("Log_out_confirm"))) {
            localStorage.removeItem("token");
            navigate("/");
        }
    };
    return (
        <div className="dropdown">
            <button
                className="btn dropdown-toggle account-btn"
                type="button"
                id="dropdownMenuButton"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
            >
                <ion-icon name="person-outline"></ion-icon>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                    <Link className="dropdown-item" to="profile">
                        Profile
                    </Link> 
                </li>
                <li>
                    <a
                        className="dropdown-item"
                        onClick={() => {
                            handleLogout();
                        }}
                    >
                        Logout
                    </a>
                </li>
            </ul>
        </div>
    );
}
