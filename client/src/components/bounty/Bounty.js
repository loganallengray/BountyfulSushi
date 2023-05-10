import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";

const Bounty = ({ bounty, userProfile, handleDeletePopup }) => {
    return (
        <Card className={typeof bounty.dateCompleted === "string" ? "complete-bounties m-2" : " m-2"}>
            <CardBody className="d-flex justify-content-between align-items-center">
                <div>
                    <CardTitle tag="h5">
                        <Link to={`/bounties/${bounty.id}`}>
                            {bounty.name}
                        </Link>
                    </CardTitle>
                    <CardSubtitle>
                        {bounty.difficulty.name}
                    </CardSubtitle>
                </div>
                <div>
                    {userProfile?.userType?.id === 1 ?
                        <div className="d-flex align-items-center justify-content-center ms-3">
                            <Link to={`edit/${bounty.id}`}>
                                <Button color="primary" className="ms-2">Edit</Button>
                            </Link>
                            <Button color="danger" className="ms-2" onClick={e => handleDeletePopup(bounty)}>X</Button>
                        </div>
                        : ""
                    }
                </div>
            </CardBody>
            <CardBody>
                <CardText className="mb-0">
                    {bounty.location}
                </CardText>
                <CardText>
                    {bounty.description}
                </CardText>
            </CardBody>
        </Card>
    );
};

export default Bounty;