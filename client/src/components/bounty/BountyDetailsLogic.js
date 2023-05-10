import React, { useState } from "react";
import { addUserBounty } from "../../modules/BountyManager";
import { useNavigate } from "react-router-dom";
import { Form, Label, Button } from "reactstrap";
import UserBountyCompletePopup from "./BountyCompletePopup";

const BountyDetailsLogic = ({ bounty, userProfile }) => {
    const [popup, setPopup] = useState({
        show: false,
        bounty: {}
    });

    const navigate = useNavigate();

    const handleAccept = (e) => {
        const userBounty = {
            userId: userProfile.id,
            bountyId: bounty.id
        }

        addUserBounty(userBounty)
            .then(e => navigate(".."))
    }

    const togglePopup = () => {
        const copy = { ...popup };

        copy.show = !popup.show;

        setPopup(copy);
    }

    const handleCompletePopup = () => {
        setPopup({ show: true, bounty: bounty })
    }

    if (userProfile?.userType?.id !== 1) {
        return (
            <div className="text-center mt-2">
                <Label for='accept' className="d-block">Accept Bounty?</Label>
                <Button color="success" onClick={e => handleAccept()}>Accept</Button>
            </div>
        );
    } else if (bounty.dateCompleted === null && bounty.users.length !== 0) {
        return (
            <>
                <div className="text-center mt-2">
                    <Label for='accept' className="d-block">Complete Bounty?</Label>
                    <Button color="success" onClick={e => handleCompletePopup()}>Complete</Button>
                </div>
                <UserBountyCompletePopup popup={popup} togglePopup={togglePopup} />
            </>
        );
    }
}

export default BountyDetailsLogic;
