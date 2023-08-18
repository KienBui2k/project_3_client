import "./main.scss";
import { Routes } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import api from "@api";
/* Route Config */
import AuthRoute from "@pages/auths/Route";
import HomeRoute from "@pages/home/Route";

import { useDispatch, useSelector } from "react-redux";
import { userActions } from "@actions/user";
import actions from "./stores/actions";

// Context Config
export const RootContext = createContext();

function App() {
    const [localCartState, setLocalCartState] = useState(false);
    const store = useSelector((store) => store);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.authenToken());
    }, []);

    useEffect(() => {
        if (!store.userStore.data) {
            return;
        }
        api.purchase
            .findCart(store.userStore?.data?.id)
            .then((res) => {
                if (res.status == 200) {
                    dispatch(actions.cartActions.setCartData(res.data.data));
                } else {
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                console.log("err", err);
                alert("server đang bảo trì!");
            });
    }, [store.userStore?.data]);

    // khi da dawng nhap thi keo cart cua user ve
    useEffect(() => {
        if (!store.userStore.data) {
            return;
        }
        api.receipt
            .findReceipt(store.userStore.data?.id)
            .then((res) => {
                if (res.status == 200) {
                    dispatch(
                        actions.receiptActions.setReceiptData(res.data.data)
                    );
                } else {
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                alert("sập!");
            });
    }, [store.userStore.data]);

    return (
        <RootContext.Provider
            value={{
                userStore: store.userStore,
                cartStore: store.cartStore,
                dispatch,
                userActions: actions.userActions,
                cartActions: actions.cartActions,
                productActions: actions.productActions,
                productStore: store.productStore,
                receiptStore: store.receiptStore,
                localCartState,
                setLocalCartState,
            }}
        >
            <Routes>
                {/* Auth Routing */}
                {AuthRoute}
                {/* Home */}
                {HomeRoute}
            </Routes>
        </RootContext.Provider>
    );
}

export default App;
