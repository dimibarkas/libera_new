import axios from "axios"

export async function listArticles(token) {
    const res = await axios({
        method: "get",
        url: "/api/articles",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if (res.status !== 200) {
        throw new Error("request failed");
    }
    return res.data;
}