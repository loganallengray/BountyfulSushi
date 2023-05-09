import React, { useEffect, useState } from "react";
import { addUserBounty, deleteUserBounty, getBounty } from "../../modules/BountyManager";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardBody, Form, FormGroup, Label, Button, Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import NotFound from "../NotFound";

const BountyDetailsLogic = ({ bounty, userProfile }) => {
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

    const handleComplete = (e) => {
        e.preventDefault();

    }

    if (userProfile?.userType?.id === 1) {
        if (bounty.dateCompleted === null) {
            return (
                <Form onSubmit={(e) => handleComplete(e)} className="text-center mt-2">
                    <Label for='accept' className="d-block">Complete Bounty?</Label>
                    <Button color="success">Complete</Button>
                </Form>
            );
        }
    } else {
        return (
            <Form onSubmit={(e) => handleAccept(e)} className="text-center mt-2">
                <Label for='accept' className="d-block">Accept Bounty?</Label>
                <Button color="success">Accept</Button>
            </Form>
        );
    }
}

export default BountyDetailsLogic;
