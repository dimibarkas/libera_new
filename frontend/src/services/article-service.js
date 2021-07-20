import axios from "axios"

export const retriveArticleList = async (url, token) => {
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


export const deleteArticle = async (token, id) => {
    const res = await axios({
        method: "delete",
        url: `/api/articles/id/${id}`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });
    if (res.status !== 200) {
        throw new Error("request failed");
    }
    return res;
}

export const getArticleById = async (token, id) => {
    const res = await axios({
        method: "get",
        url: `/api/articles/id/${id}`,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if (res.status !== 200) {
        throw new Error("request failed");
    }
    return res;
}

export const updateArticleById = async (token, id, name) => {
    const res = await axios({
        method: "patch",
        url: `/api/articles/id/${id}`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        data: {
            name: name
        }
    });
    if (res.status === 304) {
        throw new Error("request failed");
    }
    return res;
}