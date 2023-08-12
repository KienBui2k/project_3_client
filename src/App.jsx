import "./main.scss";
import { Routes } from "react-router-dom";
import { createContext, useEffect } from "react";
import api from "@api";
/* Route Config */
import AuthRoute from "@pages/auths/Route";
import HomeRoute from "@pages/home/Route";

import { useDispatch, useSelector } from "react-redux";
import actions from "./stores/actions";

// Context Config
export const RootContext = createContext();

function App() {
    const store = useSelector((store) => store);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.userActions.authenToken());
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
