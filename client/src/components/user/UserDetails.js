import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound";
import { getUser } from "../../modules/UserManager";
import { getUserBounties } from "../../modules/BountyManager";

const UserDetails = () => {
    const [user, setUser] = useState({});
    const [userBounties, setUserBounties] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        if (/\d+/.test(id)) {
            getUser(id).then(user => setUser(user));
            getUserBounties(id).then(userBounties => setUserBounties(userBounties));
        }
    }, []);

    if (/\d+/.test(id)) {
        return (
            <div className="container mt-3 mb-1">
                <div>
                    <div className="">
                        <h1>{user.name}</h1>
                        <h2>{user.email}</h2>
                        <h3>{user?.userType?.name}</h3>
                    </div>
                </div>
                <div>
                    {userBounties.length !== 0 ? userBounties.map(bounty => (
                        <div>
                            {bounty.name}
                        </div>
                    )) : ""}
                </div>
            </div>
        )
    } else {
        return <NotFound />
    }
}

export default UserDetails;