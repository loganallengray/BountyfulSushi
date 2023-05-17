import React from "react";
import { useNavigate } from "react-router-dom";
import { Label, Button } from "reactstrap";
import { addSushiOrder } from "../../modules/SushiOrder";

const SushiDetailsLogic = ({ sushi, userProfile }) => {
    const navigate = useNavigate();

    const handleOrder = (e) => {
        e.preventDefault();

        const sushiOrder = {
            userId: userProfile.id,
            sushiId: sushi.id
        }

        addSushiOrder(sushiOrder)
            .then(e => navigate(".."))
    }

    if (userProfile?.userType?.id !== 1) {
        return (
            <div className="text-center mt-2">
                <Label for='order' className="d-block">Order Sushi?</Label>
                <Button color="success" onClick={e => handleOrder(e)}>Order</Button>
            </div>
        );
    } else {
        return "";
    }
}

export default SushiDetailsLogic;
