import { Route } from "react-router-dom";
import LazyLoad from "@lazy/lazyLoading";

import Home from "./Home";
import Banner from "../subPages/banner/Banner";

export default (
    <Route path="/" element={<Home />}>
        <Route index element={<Banner />}></Route>
        <Route
            path="/about"
            element={LazyLoad(() => import("../subPages/abouts/About"))()}
        ></Route>
        <Route
            path="/contact"
            element={LazyLoad(() => import("../subPages/contact/Contact"))()}
        ></Route>
        <Route
            path="/cart"
            element={LazyLoad(() => import("../subPages/cart/Cart"))()}
        ></Route>
        <Route
            path="/search"
            element={LazyLoad(() => import("../subPages/search/Search"))()}
        ></Route>
        <Route
            path="/menu/:category"
            element={LazyLoad(() => import("../subPages/Menu/Menu"))()}
        ></Route>
        <Route
            path="/product/:id"
            element={LazyLoad(() =>
                import("../subPages/productDetail/ProductDetail")
            )()}
        ></Route>
        <Route
            path="/payment"
            element={LazyLoad(() =>
                import("../subPages/cart/Payment/Payment")
            )()}
        ></Route>
        <Route
            path="/receipts"
            element={LazyLoad(() => import("../subPages/Receipts/Receipts"))()}
        ></Route>
        <Route
            path="/profile"
            element={LazyLoad(() => import("../subPages/info/Info"))()}
        ></Route>
    </Route>
);
