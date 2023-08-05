import { Route } from "react-router-dom";
import LazyLoad from "@lazy/lazyLoading";

import Home from "./Home";
import Home_defaul from "./components/Home_defaul";

export default (
    <Route path="/" element={<Home />}>
        {/* <Route
            path="about"
            element={LazyLoad(() => import("../subPages/abouts/About"))()}
        ></Route> */}
        {/* <Route index element={<Home_defaul />}></Route> */}
        <Route
            path="admin"
            element={LazyLoad(() => import("../subPages/admin/Admin.jsx"))()}
        ></Route>
    </Route>
);
