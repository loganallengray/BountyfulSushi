import React, { useEffect, useState } from "react";
import Bounty from './Bounty';
import { getAllBounties } from "../../modules/BountyManager";

const BountyList = ({ userProfile }) => {
    const [bounties, setBounties] = useState([]);

    const getBounties = () => {
        getAllBounties().then(bounties => setBounties(bounties));
    };

    useEffect(() => {
        getBounties();
    }, []);

    return (
        <>
            <div className="container mt-4 mb-1">
                <div className="row justify-content-center">
                    {bounties.map((bounty) => (
                        <Bounty bounty={bounty} key={bounty.id} userProfile={userProfile} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default BountyList;