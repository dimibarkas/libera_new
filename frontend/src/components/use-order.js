import useSWR from "swr"
import axios from "axios"

export const getOrderbyId = async (url, token) => {
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
    return res;
}

export default function useOrder(id, token) {
    const fetcher = url => getOrderbyId(url, token)
    return useSWR(`/api/orders/id/${id}`, fetcher)
}