import axios from "axios"

export async function postLogin(username, password) {
    try {
        const resp = await axios({
            method: "post",
            url: "/api/users/login",
            data: {
                username: username,
                password: password
            }
        })
        if (resp.status === 200) {
            return resp;
        }
    } catch (error) {
        return null;
    }
    return null;
}

export async function postRegister(name, username, password) {
    let resp;
    try {
        resp = await axios({
            method: "post",
            url: "/api/users/register",
            data: {
                name: name,
                username: username,
                password: password
            }
        })
        if (resp.status === 201) {
            return resp;
        }
    } catch (error) {
        return null;
    }
    return null;
}