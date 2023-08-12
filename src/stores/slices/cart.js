import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        loading: true,
        data: null,
    },
    reducers: {
        changeLoad: (state, action) => {
            return {
                ...state,
                load: !state.load,
            };
        },
        setCartData: (state, action) => {
            state.data = { ...action.payload }
        },
        deleteProduct: (state, action) => {
            const productIdToDelete = action.payload;
            const newCart = state.data.cart_details.filter((item) => {

                console.log("action.payload.product_id", action.payload);
                return item.id !== action.payload
            })
            state.data.cart_details = newCart


        }
        // addToCart: (state, action) => {
        //     console.log("đã vào cart", action.payload);
        //     let exitProduct=state.data?.cart_details?.find(item => {
        //         return item.product.id == action.payload.data.product.id})
        //     })
        // }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            (action) => {
                if (action.meta) {
                    return action;
                }
            },
            (state, action) => {

                if (action.meta) {
                    if (action.meta.requestStatus == "pending") {
                        //console.log("đã vào pending của api: ", action.type)
                        // if (action.type == "deleteUserByid/pending") {
                        //     console.log("trường hợp pending của api delete")
                        // }
                        state.loading = true;
                    }
                    if (action.meta.requestStatus == "rejected") {
                        // console.log("đã vào rejected của api: ", action.type)
                        state.loading = false;
                    }
                    if (action.meta.requestStatus == "fulfilled") {
                        // console.log("đã vào fulfilled của api: ", action.type)
                        state.loading = false;
                    }
                }
            }
        )
    }
})

export const cartActions = {
    ...cartSlice.actions,
    // addToCart,
};

export const cartReducer = cartSlice.reducer;