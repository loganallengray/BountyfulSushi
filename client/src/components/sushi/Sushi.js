import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";

const Sushi = ({ sushi, userProfile, handleDeletePopup }) => {
    return (
        <Card className="responsive-card me-5 ms-5 mt-3 mb-3 pt-3">
            <div className="d-flex align-items-center justify-content-between mb-3 mb-3">
                <div>
                    <CardTitle tag="h5">
                        <Link to={`/sushi/${sushi.id}`}>
                            <strong>{sushi.name}</strong>
                        </Link>
                    </CardTitle>
                    <CardSubtitle>
                        {sushi.price} Tokens
                    </CardSubtitle>
                </div>
                {userProfile?.userType?.id === 1 ?
                    <div className="d-flex justify-content-end m-0 pb-1">
                        <Link to={`edit/${sushi.id}`}>
                            <Button color="primary" className="ms-2">Edit</Button>
                        </Link>
                        <Button color="danger" className="ms-2" onClick={e => handleDeletePopup(sushi)}>X</Button>
                    </div>
                    : ""}
            </div>
            <img src={sushi.imageLocation} />
            <CardBody>
                <CardText>
                    {sushi.description}
                </CardText>
            </CardBody>
        </Card>
    );
};

export default Sushi;