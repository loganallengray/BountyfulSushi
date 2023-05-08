import React, { useEffect, useState } from "react";
import { getBounty } from "../../modules/BountyManager";
import { useParams, Link } from "react-router-dom";
import { Card, CardBody, Form, FormGroup, Label, Button } from "reactstrap";
import UserBountyRemovePopup from "./UserBountyRemovePopup";
import NotFound from "../NotFound";

const UserBountyDetails = ({ userProfile }) => {
    const [bounty, setBounty] = useState({});
    const [popup, setPopup] = useState({
        show: false,
        userBounty: {}
    });

    const { userId, id } = useParams();

    useEffect(() => {
        getBountyById();
    }, []);

    const getBountyById = () => {
        if (/\d+/.test(id)) {
            const userBounty = { userId: userId, bountyId: id }

            getBounty(userBounty).then(bounty => setBounty(bounty));
        }
    }

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

    return (
        <div className="container mt-3 mb-1">
            <Card className="mb-3 p-4">
                <div className="d-flex justify-content-between">
                    <Link to={`../user/${userId}`} className="w-25">
                        <strong>{"<< Back"}</strong>
                    </Link>
                    <div className="w-75 text-center">
                        <strong>{bounty.name}</strong>
                        <div>{bounty.description}</div>
                    </div>
                    <div className="text-end w-25">
                        <div>{bounty?.difficulty?.name}</div>
                    </div>
                </div>
                <CardBody className="p-3 pb-2">
                    <div className="d-flex justify-content-between">
                        <div>
                            <div>{bounty.species}</div>
                            <div>{bounty.notes}</div>
                        </div>
                        <div className="text-end">
                            <div>{bounty.location}</div>
                        </div>
                    </div>
                    <div className="text-center mt-2">
                        <Label for='remove' className="d-block">Remove Bounty?</Label>
                        <Button color="danger" onClick={e => handleRemovePopup(bounty)}>Remove</Button>
                    </div>
                </CardBody>
            </Card>
            <UserBountyRemovePopup popup={popup} togglePopup={togglePopup} />
        </div>
    )
}

export default UserBountyDetails;
