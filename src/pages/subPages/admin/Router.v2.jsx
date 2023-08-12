import { Route } from "react-router-dom";
import LazyLoad from "@lazy/lazyLoading";
import api from "@services/api";
import CheckAdmin from "./CheckAdmin";

let isAdmin = false;

import Product_manage from "./component_v2/Product_manage/Product_manage";
async function authenAdmin() {
    await api.users
        .authenToken({
            token: localStorage.getItem("token"),
        })
        .then((res) => {
            if (res.status == 200) {
                if (res.data.data.role == "ADMIN") {
                    isAdmin = true;
                }
            }
        })
        .catch((err) => {
            console.log("err", err);
        });

    if (isAdmin) {
        return LazyLoad(() => import("./Admin.v2"))();
    } else {
        return <CheckAdmin></CheckAdmin>;
    }
}
export default (
    <Route path="admin.v2" element={await authenAdmin()}>
        <Route index element={<Product_manage></Product_manage>}></Route>
        <Route
            path="addProduct"
            element={LazyLoad(() =>
                import("./component_v2/Add_Product/AddProduct")
            )()}
        ></Route>
        <Route
            path="addCategory"
            element={LazyLoad(() =>
                import("./component_v2/Category_manage/Category")
            )()}
        ></Route>
    </Route>
);
