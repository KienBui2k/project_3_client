import axios from "axios";

export default {
    findLatestProductsByCategory: async () => {
        return await axios.get(`${process.env.REACT_APP_SERVER_HOST_API}/categories/latest-products`)
    }
}