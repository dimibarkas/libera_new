import axios from "axios"

export const listCustomers = async (url, token) => {
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

export const postCustomer = async (token, customerInfo) => {
    const res = await axios({
        method: "post",
        url: "/api/customers",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        data: {
            name: customerInfo.name,
            address: customerInfo.address,
            phone: customerInfo.phone
        },
    });
    if (res.status !== 201) {
        throw new Error("request failed");
    }
    return res;
}


export const deleteCustomer = async (token, id) => {
    const res = await axios({
        method: "delete",
        url: `/api/customers/id/${id}`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });
    if (res.status !== 200) {
        throw new Error("request failed");
    }
    return res;
}

export const getCustomerById = async (token, id) => {
    const res = await axios({
        method: "get",
        url: `/api/customers/id/${id}`,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if (res.status !== 200) {
        throw new Error("request failed");
    }
    return res;
}

export const updateCustomerById = async (token, id, customerInfo) => {
    const res = await axios({
        method: "patch",
        url: `/api/customers/id/${id}`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        data: {
            name: customerInfo.name,
            address: {
                street: customerInfo.address.street,
                nr: customerInfo.address.nr,
                zipcode: customerInfo.address.zipcode,
                city: customerInfo.address.city,
                country: customerInfo.address.country,
            },
            phone: customerInfo.phone,
        }
    });
    if (res.status === 304) {
        throw new Error("request failed");
    }
    return res;
}