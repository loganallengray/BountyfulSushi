import React, { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { getAllUsers } from "../../modules/UserManager";
import UserBountyLockPopup from "./UserLockPopup";

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
                            <tr key={user.id}>
                                <td className="align-middle">
                                    <Link to={`${user.id}`}>
                                        {user.name}
                                    </Link>
                                </td>
                                <td className="align-middle">{user.userType.name}</td>
                                <td className="text-end">
                                    <Link to={`edit/${user.id}`}>
                                        <Button color="primary">Edit</Button>
                                    </Link>
                                    {user.userType.id !== 1 ? <Button color="danger" className="ms-2" onClick={e => handleLockPopup(user)}>Lock</Button> : ""}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <UserBountyLockPopup popup={popup} togglePopup={togglePopup} />
        </div>
    );
};

export default UserList;