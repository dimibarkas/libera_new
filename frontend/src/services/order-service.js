import axios from "axios"

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

