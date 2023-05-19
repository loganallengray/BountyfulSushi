import React, { useEffect, useState } from "react";
import { getSushiOrderByUserId } from "../../../../modules/SushiOrderManager";
import UserOrder from "./UserOrder";
import { useParams } from "react-router-dom";
import UserOrderDeletePopup from "./UserOrderDeletePopup";
import { me } from "../../../../modules/AuthManager";

const UserOrderList = ({ userProfile, updateUser }) => {
    const [orders, setOrders] = useState([]);
    const [deletePopup, setDeletePopup] = useState({
        show: false,
        order: {}
    });

    const { userId } = useParams();

    const getOrders = () => {
        getSushiOrderByUserId(userId).then(orders => setOrders(orders));
    };

    useEffect(() => {
        getOrders();
    }, []);

    const handleDeletePopup = (order) => {
        setDeletePopup({ show: true, order: order })
    }

    const toggleDeletePopup = () => {
        const copy = { ...deletePopup };

        copy.show = !deletePopup.show;

        setDeletePopup(copy);
    }

    const afterDelete = () => {
        getOrders();
        updateUser();
    }

    return (
        <>
            <div className="container mt-3 mb-1">
                <div className="row justify-content-center">
                    {orders.map((order) => (
                        <UserOrder order={order} key={order.id} handleDeletePopup={handleDeletePopup} />
                    ))}
                    <UserOrderDeletePopup popup={deletePopup} togglePopup={toggleDeletePopup} afterDelete={afterDelete} />
                </div>
            </div>
        </>
    );
};

export default UserOrderList;