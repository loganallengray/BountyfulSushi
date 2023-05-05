import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";

const Bounty = ({ bounty }) => {
    return (
        <Card className="mb-3 p-2">
            <CardBody>
                <div className="d-flex justify-content-between">
                    <div>
                        <Link to={`/bounties/${bounty.id}`}>
                            <strong>{bounty.name}</strong>
                        </Link>
                        <div>{bounty.description}</div>
                    </div>
                    <div className="d-flex">
                        <div className="text-end">
                            <div>{bounty?.difficulty?.name}</div>
                            <div>{bounty.location}</div>
                        </div>
                        <div className="d-flex align-items-center">
                            <Button color="primary" className="ms-4">Edit</Button>
                            <Button color="success" className="ms-2">Complete</Button>
                            <Button color="danger" className="ms-2">X</Button>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default Bounty;