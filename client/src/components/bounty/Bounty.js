import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

const Bounty = ({ bounty }) => {
    return (
        <Card className="mb-3 p-2">
            <CardBody>
                <p>
                    <Link to={`/bountys/${bounty.id}`}>
                        <strong>{bounty.name}</strong>
                    </Link>
                </p>
                <p>{bounty.description}</p>
            </CardBody>
        </Card>
    );
};

export default Bounty;