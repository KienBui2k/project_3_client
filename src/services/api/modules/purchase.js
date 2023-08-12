import axios, { Axios } from "axios";

export default {
    findCart: async (userId) => {
        return await axios.get(
            `${process.env.REACT_APP_SERVER_HOST_API}/purchase/${userId}`,
            {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }
        )
    },
    addToCart: async (user_id, data) => {
        return await axios.post(
            `${process.env.REACT_APP_SERVER_HOST_API}/purchase/${user_id}`, data,
            {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }
        )
    },
    deleteProduct: async (product_id) => {
        return await axios.delete(
            `${process.env.REACT_APP_SERVER_HOST_API}/purchase/${product_id}`
        )
    },
    updateCart: async (user_id, data) => {
        return await axios.patch(
            `${process.env.REACT_APP_SERVER_HOST_API}/purchase/${user_id}`, data,
            {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }
        )
    },

}