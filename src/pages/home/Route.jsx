import { Route } from "react-router-dom";
import LazyLoad from "@lazy/lazyLoading";

import Home from "./Home";

export default (
    <Route path="/" element={<Home />}>
        <Route
            path="about"
            element={LazyLoad(() => import("../subPages/abouts/About"))()}
        ></Route>
    </Route>
);
