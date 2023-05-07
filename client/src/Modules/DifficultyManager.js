import { getToken } from "./AuthManager";

const baseUrl = '/api/difficulty';

export const getAllDifficulties = () => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((res) => res.json())
    })
};

export const getDifficulty = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((res) => res.json());
    })
};

export const addDifficulty = (Difficulty) => {
    // post fetch, sends Difficulty object to the DifficultyController in backend
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Difficulty),
        });
    })
};

export const editDifficulty = (Difficulty) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${Difficulty.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Difficulty)
        });
    })
};

export const deleteDifficulty = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    })
};