import axios from "axios"

export const listArticles = async (url, token) => {
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

export const postArticle = async (token, name) => {
    const res = await axios({
        method: "post",
        url: "/api/articles",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        data: {
            name: name
        },
    });
    if (res.status !== 201) {
        throw new Error("request failed");
    }
    return res;
}