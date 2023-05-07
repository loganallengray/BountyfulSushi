import React, { useEffect, useState } from "react";
import Bounty from './Bounty';
import { getUserBounties } from "../../modules/BountyManager";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UserBountyList = ({ userProfile }) => {
    const [bounties, setBounties] = useState([]);
    const { userId } = useParams();
    const navigate = useNavigate();


    const getBounties = () => {
        getUserBounties(userId).then(bounties => setBounties(bounties));
    };

    useEffect(() => {
        getBounties();
    }, []);

    if (userProfile?.id == userId || userProfile?.userType?.id === 1) {
        return (
            <>
                <div className="container mt-4 mb-1">
                    <div className="row justify-content-center">
                        {bounties.map((bounty) => (
                            <Bounty bounty={bounty} key={bounty.id} />
                        ))}
                    </div>
                </div>
            </>
        );
    } else {
        navigate(`../user/${userProfile?.id}`);
    }
};

export default UserBountyList;