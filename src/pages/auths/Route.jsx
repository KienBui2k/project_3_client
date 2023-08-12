import { Route } from "react-router-dom";
import LazyLoad from "@lazy/lazyLoading";
import Admin2 from "../subPages/admin/Router.v2";
export default (
    <>
        <Route
            path="register"
            element={LazyLoad(() => import("./Register"))()}
        ></Route>
        <Route
            path="login"
            element={LazyLoad(() => import("./Login"))()}
        ></Route>
        <Route
            path="profile"
            element={LazyLoad(() => import("./Info"))()}
        ></Route>
        {Admin2}
        {/* <Route
            path="admin.v2"
            element={LazyLoad(() => import("../subPages/admin/Admin.v2"))()}
        ></Route> */}
    </>
);
