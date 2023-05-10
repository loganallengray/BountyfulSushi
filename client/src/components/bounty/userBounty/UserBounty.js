import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";

const UserBounty = ({ bounty, userId, handleRemovePopup }) => {
    return (
        <Card className={typeof bounty.dateCompleted === "string" ? "complete-bounties m-2" : " m-2"}>
            <CardBody className="d-flex justify-content-between align-items-center">
                <div>
                    <CardTitle tag="h5">
                        <Link to={`/bounties/user/${userId}/${bounty.id}`}>
                            {bounty.name}
                        </Link>
                    </CardTitle>
                    <CardSubtitle>
                        {bounty.difficulty.name}
                    </CardSubtitle>
                </div>
                <div>
                    {bounty.dateCompleted === null ? <div className="d-flex align-items-center justify-content-center ms-3">
                        <Button color="danger" className="ms-2" onClick={e => handleRemovePopup(bounty)}>X</Button>
                    </div> : ""}
                </div>
            </CardBody>
            <img src={bounty.imageLocation} />
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

export default UserBounty;