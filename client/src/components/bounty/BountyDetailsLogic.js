import React, { useEffect, useState } from "react";
import { addUserBounty, deleteUserBounty, getBounty } from "../../modules/BountyManager";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardBody, Form, FormGroup, Label, Button, Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import NotFound from "../NotFound";
import UserBountyCompletePopup from "./BountyCompletePopup";

const BountyDetailsLogic = ({ bounty, userProfile }) => {
    const [popup, setPopup] = useState({
        show: false,
        bounty: {}
    });

    const navigate = useNavigate();

    const handleAccept = (e) => {
        e.preventDefault();

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
            <Form onSubmit={(e) => handleAccept(e)} className="text-center mt-2">
                <Label for='accept' className="d-block">Accept Bounty?</Label>
                <Button color="success">Accept</Button>
            </Form>
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
