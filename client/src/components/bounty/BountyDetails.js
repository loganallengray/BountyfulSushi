import React, { useEffect, useState } from "react";
import { getBounty } from "../../modules/BountyManager";
import { useParams, Link } from "react-router-dom";
import { Card, CardBody, Form, FormGroup, Label, Button } from "reactstrap";
import NotFound from "../NotFound";
import BountyDetailsLogic from "./BountyDetailsLogic";

const BountyDetails = ({ userProfile }) => {
    const [bounty, setBounty] = useState({});
    const { id } = useParams();

    useEffect(() => {
        if (/\d+/.test(id)) {
            getBounty(id).then(bounty => setBounty(bounty));
        }
    }, []);

    if (/\d+/.test(id)) {
        return (
            <div className="container mt-3 mb-1">
                <Card className={typeof bounty.dateCompleted === "string" ? "mb-3 p-4 complete-bounties" : "mb-3 p-4"}>
                    <div className="d-flex justify-content-between">
                        <Link to={`..`} className="w-25">
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
                        <BountyDetailsLogic bounty={bounty} userProfile={userProfile} />
                    </CardBody>
                </Card>
            </div>
        )
    } else {
        return <NotFound />
    }
}

export default BountyDetails;
