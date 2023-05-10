import React, { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { getAllUsers } from "../../modules/UserManager";

const UserList = ({ userProfile }) => {
    const [users, setUsers] = useState([]);
    const [popup, setPopup] = useState({
        show: false,
        user: {}
    });

    const navigate = useNavigate();

    const getUsers = () => {
        getAllUsers().then(users => setUsers(users));
    };

    const handleLockPopup = (user) => {
        setPopup({ show: true, user: user })
    }

    const togglePopup = () => {
        const copy = { ...popup };

        copy.show = !popup.show;

        setPopup(copy);
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="container mt-3 mb-1">
            <Table hover>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>User Type</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return (
                            <tr key={user.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/users/${user.id}`)}>
                                <td>{user.name}</td>
                                <td>{user.userType.name}</td>
                                <td className="text-end">
                                    <Button color="primary">Edit</Button>
                                    <Button color="danger" className="ms-2">Lock</Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};

export default UserList;