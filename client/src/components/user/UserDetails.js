import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NotFound from "../NotFound";
import { getUser } from "../../modules/UserManager";
import { getUserBounties } from "../../modules/BountyManager";
import UserBountyLockPopup from "./UserLockPopup";
import { Button } from "reactstrap";

const UserDetails = () => {
    const [user, setUser] = useState({});
    const [userBounties, setUserBounties] = useState([]);
    const [popup, setPopup] = useState({
        show: false,
        user: {}
    });

    const { id } = useParams();

    useEffect(() => {
        if (/\d+/.test(id)) {
            getUser(id).then(user => setUser(user));
            getUserBounties(id).then(userBounties => setUserBounties(userBounties));
        }
    }, []);

    const handleLockPopup = (user) => {
        setPopup({ show: true, user: user })
    }

    const togglePopup = () => {
        const copy = { ...popup };

        copy.show = !popup.show;

        setPopup(copy);
    }

    if (/\d+/.test(id)) {
        return (
            <>
                <div className="container mt-3 mb-1">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex">
                            <div className="d-flex align-items-center me-3">
                                <img src={user.imageLocation} height="80px" width="80px" className="rounded-images" />
                            </div>
                            <div>
                                <h1>{user.userName}</h1>
                                <h3>{user?.userType?.name} | {user.locked ? "Locked" : "Active"}</h3>
                            </div>
                        </div>
                        <div>
                            <Link to={`../edit/${user.id}`}>
                                <Button color="primary">Edit</Button>
                            </Link>
                            {user?.userType?.id !== 1 ? <Button color="danger" className="ms-2" onClick={e => handleLockPopup(user)}>Lock</Button> : ""}
                        </div>
                    </div>
                    <div>
                        <div>{user.email}</div>
                        <div>{user.firstName} {user.lastName}</div>
                    </div>
                    <div>
                        {userBounties.length !== 0 ? userBounties.map(bounty => (
                            <div>
                                {bounty.name}
                            </div>
                        )) : ""}
                    </div>
                </div>
                <UserBountyLockPopup popup={popup} togglePopup={togglePopup} />
            </>
        )
    } else {
        return <NotFound />
    }
}

export default UserDetails;