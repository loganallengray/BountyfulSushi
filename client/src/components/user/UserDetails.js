import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NotFound from "../NotFound";
import { getUserBounties } from "../../modules/BountyManager";
import UserBountyLockPopup from "./UserLockPopup";
import { Button } from "reactstrap";
import UserLockLogic from "./UserLockLogic";
import { getUserById } from "../../modules/UserManager";

const UserDetails = () => {
    const [user, setUser] = useState({});
    const [userBounties, setUserBounties] = useState([]);
    const [popup, setPopup] = useState({
        show: false,
        user: {}
    });

    const { id } = useParams();

    const getUser = () => {
        getUserById(id).then(user => setUser(user));
    }

    useEffect(() => {
        if (/\d+/.test(id)) {
            getUser();
            getUserBounties(id).then(userBounties => setUserBounties(userBounties));
        }
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
        getUser();
    }

    if (/\d+/.test(id)) {
        return (
            <>
                <div className="container mt-3 mb-1">
                    <Link to={`..`}>
                        <strong>{"<< Back"}</strong>
                    </Link>
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
                            {user?.userType?.id !== 1 ? <UserLockLogic user={user} handleLockPopup={handleLockPopup} /> : ""}
                        </div>
                    </div>
                    <div>
                        <div>{user.email}</div>
                        <div>{user.firstName} {user.lastName}</div>
                    </div>
                    {/* <div>
                        {userBounties.length !== 0 ? userBounties.map(bounty => (
                            <div>
                                {bounty.name}
                            </div>
                        )) : ""}
                    </div> */}
                </div>
                <UserBountyLockPopup popup={popup} togglePopup={togglePopup} afterToggleLock={afterToggleLock} />
            </>
        )
    } else {
        return <NotFound />
    }
}

export default UserDetails;