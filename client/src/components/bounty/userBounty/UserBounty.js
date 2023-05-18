import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";

const UserBounty = ({ bounty, userId, handleRemovePopup }) => {
    return (
        <Card className={typeof bounty.dateCompleted === "string" ? "complete-bounties responsive-card me-5 ms-5 mt-3 mb-3 pt-3" :
            "responsive-card me-5 ms-5 mt-3 mb-3 pt-3"}>
            <div className="d-flex align-items-center justify-content-between mb-3">
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
                {bounty.dateCompleted === null ?
                    <div className="d-flex justify-content-end m-0 pb-1">
                        <Button color="danger" className="ms-2" onClick={e => handleRemovePopup(bounty)}>X</Button>
                    </div> : ""}
            </div>
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