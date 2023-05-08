import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";

const UserBounty = ({ bounty, userId, handleRemovePopup }) => {
    return (
        <Card className="mb-3 p-2">
            <CardBody>
                <div className="d-flex justify-content-between">
                    <div>
                        <Link to={`/bounties/user/${userId}/${bounty.id}`}>
                            <strong>{bounty.name}</strong>
                        </Link>
                        <div>{bounty.description}</div>
                    </div>
                    <div className="d-flex">
                        <div className="text-end">
                            <div>{bounty?.difficulty?.name}</div>
                            <div>{bounty.location}</div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center ms-3">
                            <Button color="danger" className="ms-2" onClick={e => handleRemovePopup(bounty)}>X</Button>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default UserBounty;