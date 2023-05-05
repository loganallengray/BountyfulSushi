import React, { useEffect, useState } from "react";
import { getBounty } from "../../modules/BountyManager";
import { useParams, Link } from "react-router-dom";
import { Card, CardBody, Form, FormGroup, Label, Button } from "reactstrap";

const BountyDetails = () => {
    const [bounty, setBounty] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        getBounty(id).then(bounties => setBounty(bounties));
    }, []);

    const handleAccept = (e) => {
        e.preventDefault();

    }

    return (
        <div className="container mt-3 mb-1">
            <Card className="mb-3 p-4">
                <div className="d-flex justify-content-between">
                    <Link to={`..`} className="w-25">
                        <strong>{"<< Back"}</strong>
                    </Link>
                    <strong className="w-75 text-center">{bounty.name}</strong>
                    <div className="text-end w-25">
                        <div>{bounty?.difficulty?.name}</div>
                    </div>
                </div>
                <CardBody className="p-3 pb-2">
                    <div className="d-flex justify-content-between">
                        <div>
                            <div>{bounty.species}</div>
                            <div>{bounty.description}</div>
                        </div>
                        <div className="text-end">
                            <div>{bounty.location}</div>
                            <div>{bounty.notes}</div>
                        </div>
                    </div>
                    <Form onSubmit={(e) => handleAccept(e)} className="text-center mt-2">
                        <Label for='name' className="d-block">Accept Bounty?</Label>
                        <Button color="success">Accept</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default BountyDetails;
