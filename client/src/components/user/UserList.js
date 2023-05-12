import React, { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { getAllUsers } from "../../modules/UserManager";
import UserBountyLockPopup from "./UserLockPopup";
import UserLockLogic from "./UserLockLogic";

const UserList = ({ userProfile }) => {
    const [users, setUsers] = useState([]);
    const [popup, setPopup] = useState({
        show: false,
        user: {},
        lock: false
    });

    const navigate = useNavigate();

    const getUsers = () => {
        getAllUsers().then(users => setUsers(users));
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleLockPopup = (user, locked) => {
        setPopup({ show: true, user: user, locked: locked })
    }

    const togglePopup = () => {
        const copy = { ...popup };

        copy.show = !popup.show;

        setPopup(copy);
    }

    const afterToggleLock = () => {
        getUsers();
    }

    return (
        <div className="container mt-3 mb-1">
            <Table hover>
                <thead>
                    <tr>
                        <th></th>
                        <th>Username</th>
                        <th>Full Name</th>
                        <th>User Type</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return (
                            <tr key={user.id}>
                                <td>
                                    <img src={user.imageLocation} width="50px" height="50px" className="rounded-images" />
                                </td>
                                <td className="align-middle">
                                    <Link to={`${user.id}`}>
                                        {user.userName}
                                    </Link>
                                </td>
                                <td className="align-middle">{user.firstName} {user.lastName}</td>
                                <td className="align-middle">{user.userType.name}</td>
                                <td className="text-end">
                                    <div>
                                        <Link to={`edit/${user.id}`}>
                                            <Button color="primary">Edit</Button>
                                        </Link>
                                        {user.userType.id !== 1 ? <UserLockLogic user={user} handleLockPopup={handleLockPopup} /> : ""}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <UserBountyLockPopup popup={popup} togglePopup={togglePopup} afterToggleLock={afterToggleLock} />
        </div>
    );
};

export default UserList;