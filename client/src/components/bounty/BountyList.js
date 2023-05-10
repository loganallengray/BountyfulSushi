import React, { useEffect, useState } from "react";
import Bounty from './Bounty';
import { getAllBounties } from "../../modules/BountyManager";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import BountyDeletePopup from "./BountyDeletePopup";

const BountyList = ({ userProfile }) => {
    const [bounties, setBounties] = useState([]);
    const [popup, setPopup] = useState({
        show: false,
        bounty: {}
    });

    const getBounties = () => {
        getAllBounties().then(bounties => setBounties(bounties));
    };

    const handleDeletePopup = (bounty) => {
        setPopup({ show: true, bounty: bounty })
    }

    const togglePopup = () => {
        const copy = { ...popup };

        copy.show = !popup.show;

        setPopup(copy);
    }

    useEffect(() => {
        getBounties();
    }, []);

    return (
        <>
            <div className="container mt-3 mb-1">
                {userProfile?.userType?.id === 1 ?
                    <div className="text-center">
                        <Link to="add">
                            <Button color="primary">Add Bounty</Button>
                        </Link>
                    </div> : ""}
                <div className="row justify-content-center">
                    {bounties.map((bounty) => (
                        <Bounty bounty={bounty} key={bounty.id} userProfile={userProfile} handleDeletePopup={handleDeletePopup} />
                    ))}
                    <BountyDeletePopup popup={popup} togglePopup={togglePopup} getBounties={getBounties} />
                </div>
            </div>
        </>
    );
};

export default BountyList;