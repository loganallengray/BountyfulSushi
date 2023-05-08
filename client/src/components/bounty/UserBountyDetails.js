import React, { useEffect, useState } from "react";
import { getBounty } from "../../modules/BountyManager";
import { useParams, Link } from "react-router-dom";
import { Card, CardBody, Form, FormGroup, Label, Button } from "reactstrap";
import NotFound from "../NotFound";
import BountyDetailsLogic from "./BountyDetailsLogic";

const UserBountyDetails = () => {
    const [bounty, setBounty] = useState({});
    const { userId, id } = useParams();

    useEffect(() => {
        if (/\d+/.test(id)) {
            getBounty(id).then(bounty => setBounty(bounty));
        }
    }, []);

    const handleRemove = (e) => {
        e.preventDefault();

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
                    <Form onSubmit={(e) => handleRemove(e)} className="text-center mt-2">
                        <Label for='remove' className="d-block">Remove Bounty?</Label>
                        <Button color="danger">Remove</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default UserBountyDetails;