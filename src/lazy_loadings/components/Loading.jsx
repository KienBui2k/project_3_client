import React from "react";
import "./Loading.scss";

export default function Loading() {
    return (
        <div className="loading_container">
            <img
                className="rotating-image"
                src="https://firebasestorage.googleapis.com/v0/b/bui-hai-kien-ejs.appspot.com/o/image.png?alt=media&token=ab987182-039c-47d5-9879-7d57782b9333"
                // src={`${process.env.REACT_APP_SERVER_HOST}images/loading.png`}
            />
        </div>
    );
}
