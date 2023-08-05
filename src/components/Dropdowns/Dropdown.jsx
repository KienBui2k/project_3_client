import React from "react";
import "./dropdown.scss";
import { useNavigate } from "react-router-dom";

export default function DropdownLogout({ userStore }) {
    console.log("userStore", userStore);
    const navigate = useNavigate();
    const handleLogout = () => {
        if (window.confirm("Bạn có muốn đăng xuất không?")) {
            localStorage.removeItem("token");
            // dispatch(userLoginActions.logOut());
            navigate("/login");
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
                    <a className="dropdown-item" href="profile">
                        Profile
                    </a>
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
