import React from "react";
import { useNavigate } from "react-router-dom";
import { Label, Button } from "reactstrap";
import { addSushiOrder } from "../../modules/SushiOrderManager";
import { me } from "../../modules/AuthManager";

const SushiDetailsLogic = ({ sushi, userProfile, updateUser }) => {
    const navigate = useNavigate();

    const handleOrder = (e) => {
        e.preventDefault();

        if (userProfile.currency >= sushi.price) {
            const sushiOrder = {
                userId: userProfile.id,
                sushiId: sushi.id,
                sushi: sushi
            }

            addSushiOrder(sushiOrder)
                .then(e => updateUser())
                .then(e => navigate(".."))
        } else {
            window.alert("You do not have enough tokens to purchase this sushi.")
        }
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
