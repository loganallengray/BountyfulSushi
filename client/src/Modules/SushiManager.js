import { getToken } from "./AuthManager";

const baseUrl = '/api/sushi';

export const getAllSushi = () => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((res) => res.json())
    })
};

export const getSushiById = (userId) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/user/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((res) => res.json())
    })
};

export const addSushi = (sushi) => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(sushi),
        });
    })
};

export const editSushi = (sushi) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${sushi.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(sushi)
        });
    })
};

export const deleteSushi = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    })
};