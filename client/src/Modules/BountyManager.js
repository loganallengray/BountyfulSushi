import { getToken } from "./AuthManager";

const baseUrl = '/api/bounty';

export const getAllBounties = () => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((res) => res.json())
    })
};

export const getUserBounties = (userId) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/user/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((res) => res.json())
    })
};

export const getBountyById = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((res) => res.json())
    })
};

export const getUserBountyById = (userBounty) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${userBounty.userId}/${userBounty.bountyId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((res) => res.json())
    })
};

export const addBounty = (bounty) => {
    // post fetch, sends bounty object to the bountyController in backend
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bounty),
        });
    })
};

export const editBounty = (bounty) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${bounty.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bounty)
        });
    })
};

export const deleteBounty = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    })
};

export const addUserBounty = (userBounty) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/useraccept`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userBounty),
        });
    })
};

export const deleteUserBounty = (userBounty) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/userremove`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userBounty),
        });
    })
};

export const completeBounty = (userBounty) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/complete`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userBounty)
        });
    })
};