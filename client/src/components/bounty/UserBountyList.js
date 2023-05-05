import React, { useEffect, useState } from "react";
import Bounty from './Bounty';
import { getUserBounties } from "../../modules/BountyManager";
import { useParams } from "react-router-dom";

const UserBountyList = () => {
    const [bounties, setBounties] = useState([]);
    const { userId } = useParams();

    const getBounties = () => {
        getUserBounties(userId).then(bounties => setBounties(bounties));
    };

    useEffect(() => {
        getBounties();
    }, []);

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
};

export default UserBountyList;