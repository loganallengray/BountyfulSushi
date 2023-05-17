import { getToken } from "./AuthManager";

const baseUrl = '/api/sushiorder';

export const getAllSushiOrders = () => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((res) => res.json())
    })
};

export const getSushiOrderById = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((res) => res.json())
    })
};

export const addSushiOrder = (sushiOrder) => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(sushiOrder),
        });
    })
};

export const editSushiOrder = (sushiOrder) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${sushiOrder.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(sushiOrder)
        });
    })
};

export const deleteSushiOrder = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    })
};