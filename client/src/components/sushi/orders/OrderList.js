import React, { useEffect, useState } from "react";
import { getAllSushiOrders } from "../../../modules/SushiOrder";
import Order from "./Order";
import OrderDeletePopup from "./OrderDeletePopup";
import OrderCompletePopup from "./OrderCompletePopup";

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [completePopup, setCompletePopup] = useState({
        show: false,
        order: {}
    });
    const [deletePopup, setDeletePopup] = useState({
        show: false,
        order: {}
    });

    const getOrders = () => {
        getAllSushiOrders().then(orders => setOrders(orders));
    };

    useEffect(() => {
        getOrders();
    }, []);

    const handleCompletePopup = (order) => {
        setCompletePopup({ show: true, order: order })
    }

    const toggleCompletePopup = () => {
        const copy = { ...completePopup };

        copy.show = !completePopup.show;

        setCompletePopup(copy);
    }

    const handleDeletePopup = (order) => {
        setDeletePopup({ show: true, order: order })
    }

    const toggleDeletePopup = () => {
        const copy = { ...deletePopup };

        copy.show = !deletePopup.show;

        setDeletePopup(copy);
    }

    const afterConfirm = () => {
        getOrders();
    }

    return (
        <>
            <div className="container mt-3 mb-1">
                <div className="row justify-content-center">
                    {orders.map((order) => (
                        <Order order={order} key={order.id} handleCompletePopup={handleCompletePopup} handleDeletePopup={handleDeletePopup} />
                    ))}
                    <OrderDeletePopup popup={deletePopup} togglePopup={toggleDeletePopup} afterDelete={afterConfirm} />
                    <OrderCompletePopup popup={completePopup} togglePopup={toggleCompletePopup} afterComplete={afterConfirm} />
                </div>
            </div>
        </>
    );
};

export default OrderList;