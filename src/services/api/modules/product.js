import axios from "axios";

export default {
    findProductById: async (id) => {
        console.log("id", id)
        return await axios.get(`${process.env.REACT_APP_SERVER_HOST_API}/product/` + id)
    },
    search: async function (searchString) {
        return await axios.get(`${process.env.REACT_APP_SERVER_HOST_API}/product?search=${searchString}`)
    },
}