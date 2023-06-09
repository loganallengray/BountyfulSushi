import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";

const UserOrder = ({ order, handleDeletePopup }) => {
    return (
        <Card className={typeof order.dateCompleted === "string" ? "complete-bounties responsive-card me-5 ms-5 mt-3 mb-3 pt-3" : "responsive-card me-5 ms-5 mt-3 mb-3 pt-3"}>
            <div className="d-flex align-items-center justify-content-between mb-3 mb-3">
                <div>
                    <CardTitle tag="h5">
                        <Link to={`/sushi/${order?.sushi?.id}`}>
                            <strong>{order?.sushi?.name}</strong>
                        </Link>
                    </CardTitle>
                    <CardSubtitle>
                        <Link to={`/users/${order?.user?.id}`}>
                            <strong>{order?.user?.firstName} {order?.user?.lastName}</strong>
                        </Link>
                    </CardSubtitle>
                </div>
                <div className="d-flex flex-column align-items-end ms-3">
                    {typeof order.dateCompleted === "string" ? "" : <Button color="danger" onClick={e => handleDeletePopup(order)}>X</Button>}
                </div>
            </div>
            <img src={order?.sushi?.imageLocation} />
            <CardBody>
                <CardText>
                    {order?.sushi?.description}
                </CardText>
            </CardBody>
        </Card>
    );
};

export default UserOrder;