import React, { useEffect, useState } from "react";
import { addUserBounty, deleteUserBounty, getBounty } from "../../modules/BountyManager";
import { useParams, Link } from "react-router-dom";
import { Card, CardBody, Form, FormGroup, Label, Button, Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import NotFound from "../NotFound";

const BountyDetailsLogic = ({ bounty, userProfile }) => {
    const handleAccept = (e) => {
        e.preventDefault();

        const userBounty = {
            userId: userProfile.id,
            bountyId: bounty.id
        }

        addUserBounty(userBounty);
    }

    const handleComplete = (e) => {
        e.preventDefault();

    }

    if (userProfile?.userType?.id === 1) {
        return (
            <Form onSubmit={(e) => handleComplete(e)} className="text-center mt-2">
                <Label for='accept' className="d-block">Complete Bounty?</Label>
                {/* <Dropdown isOpen={showDropdown} toggle={toggleDropdown} className="d-block react-dropdown">
                    <DropdownToggle color="primary" className="btn btn-sm" caret>{dropdownText}</DropdownToggle>
                    <DropdownMenu>
                        {difficulties.map((difficulty) => {
                            return (
                                <DropdownItem id="difficultyId" name={difficulty.name} value={difficulty.id} key={difficulty.id}
                                    onClick={(e) => {
                                        handleChange(e);
                                    }}>
                                    {difficulty.name}
                                </DropdownItem>
                            );
                        })}
                    </DropdownMenu>
                </Dropdown> */}
                <Button color="success">Complete</Button>
            </Form>
        );
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
