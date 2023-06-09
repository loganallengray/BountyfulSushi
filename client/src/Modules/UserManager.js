import { getToken } from "./AuthManager";

const baseUrl = "/api/user";

export const getAllUsers = () => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error(
                        "An unknown error occurred.",
                    );
                }
            })
    })
};

export const getUserById = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/details/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => res.json());
    })
};

export const getUserTypes = () => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/usertypes`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => res.json());
    })
};

export const editUser = (user) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${user.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        });
    })
};

export const toggleLock = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/togglelock/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
    })
};
