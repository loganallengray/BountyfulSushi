import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";

const Order = ({ order, handleDeletePopup }) => {
    return (
        <Card className="responsive-card me-5 ms-5 mt-3 mb-3 pt-3">
            <div className="d-flex align-items-center justify-content-between mb-3 mb-3">
                <div>
                    <CardTitle tag="h5">
                        <Link to={`/orders/${order.id}`}>
                            <strong>{order?.sushi?.name}</strong>
                        </Link>
                    </CardTitle>
                    <CardSubtitle>
                        {order?.user?.firstName} {order?.user?.lastName}
                    </CardSubtitle>
                </div>
                <div className="d-flex justify-content-end m-0 pb-1">
                    <Link to={`edit/${order.id}`}>
                        <Button color="primary" className="ms-2">Edit</Button>
                    </Link>
                    <Button color="danger" className="ms-2" onClick={e => handleDeletePopup(order)}>X</Button>
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

export default Order;