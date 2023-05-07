import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";

const Bounty = ({ bounty, userProfile }) => {
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
                        {userProfile?.userType?.id === 1 ?
                            <div className="d-flex align-items-center justify-content-center ms-3">
                                <Button color="primary" className="ms-2">Edit</Button>
                                <Button color="success" className="ms-2">Complete</Button>
                                <Button color="danger" className="ms-2">X</Button>
                            </div>
                            : ""
                        }
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default Bounty;