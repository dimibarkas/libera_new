import axios from "axios"
import Error from "../components/error";

export const listOrders = async (url, token) => {
    const res = await axios({
        method: "get",
        url: url,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if (res.status !== 200) {
        throw new Error("request failed");
    }
    return res.data;
}

export const getOrderbyId = async (token, id) => {
    const res = await axios({
        method: "get",
        url: `/api/orders/id/${id}`,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if (res.status !== 200) {
        throw new Error("request failed");
    }
    return res;
}

export const deleteOrderById = async (token, id) => {
    const res = await axios({
        method: "delete",
        url: `/api/orders/id/${id}`,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if (res.status !== 200) {
        throw new Error("request failed")
    }
    return res;
}

export const postOrder = async (token, orderInfo) => {
    const res = await axios({
        method: "post",
        url: "/api/orders",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        data: {
            customer_name: orderInfo.customer_name,
            date: orderInfo.date,
            positions: orderInfo.positions
        }
    });
    if (res.status !== 201) {
        throw new Error("request failed")
    }
    return res;
}

export const updateOrderById = async (token, id, orderInfo) => {
    const res = await axios({
        method: "patch",
        url: `/api/orders/id/${id}`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        data: {
            customer_name: orderInfo.customer_name,
            date: orderInfo.date,
            positions: orderInfo.positions
        }
    });
    if (res.status === 304) {
        throw new Error("request failed");
    }
    return res;
}

export const generateBuyList = async (url) => {
    const res = await axios({
        method: "get",
        url: url,
        // headers: {
        //     "Authorization": `Bearer ${token}`
        // }
    });
    if (res.status !== 200) {
        throw new Error("request failed");
    }
    return res.data;
}

export const getBuyList = async () => {
    const res = await axios({
        method: "get",
        url: "/fetch-buylist",
        responseType: "blob"
    });
    if (res.status !== 200) {
        throw new Error("reqest failed");
    }
    return res
}

