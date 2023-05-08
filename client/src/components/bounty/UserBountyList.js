import React, { useEffect, useState } from "react";
import Bounty from './Bounty';
import { getBounty, getUserBounties } from "../../modules/BountyManager";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NotFound from "../NotFound";
import UserBounty from "./UserBounty";
import UserBountyRemovePopup from "./UserBountyRemovePopup";

const UserBountyList = ({ userProfile }) => {
    const [bounties, setBounties] = useState([]);
    const [popup, setPopup] = useState({
        show: false,
        userBounty: {}
    });

    const { userId } = useParams();

    const getBounties = () => {
        getUserBounties(userId).then(bounties => setBounties(bounties));
    };

    const handleRemovePopup = (bounty) => {
        setPopup({
            show: true, userBounty: {
                userId: userProfile.id,
                bountyId: bounty.id,
                bounty: bounty
            }
        })
    }

    const togglePopup = () => {
        const copy = { ...popup };

        copy.show = !popup.show;

        setPopup(copy);
    }

    useEffect(() => {
        getBounties();
    }, []);

    if (userProfile?.id == userId || userProfile?.userType?.id === 1) {
        return (
            <>
                <div className="container mt-4 mb-1">
                    <div className="row justify-content-center">
                        {bounties.map((bounty) => (
                            <UserBounty bounty={bounty} userId={userId} handleRemovePopup={handleRemovePopup} key={bounty.id} />
                        ))}
                        <UserBountyRemovePopup popup={popup} togglePopup={togglePopup} getBounties={getBounties} />
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <NotFound />
        )
    }
};

export default UserBountyList;