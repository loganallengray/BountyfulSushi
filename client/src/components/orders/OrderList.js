import React, { useEffect, useState } from "react";
import { getAllSushiOrders } from "../../modules/SushiOrder";
import Order from "./Order";
import OrderDeletePopup from "./OrderDeletePopup";

const OrderList = ({ userProfile }) => {
    const [orders, setOrders] = useState([]);
    const [popup, setPopup] = useState({
        show: false,
        orders: {}
    });

    const getOrders = () => {
        getAllSushiOrders().then(orders => setOrders(orders));
    };

    useEffect(() => {
        getOrders();
    }, []);

    const handleDeletePopup = (orders) => {
        setPopup({ show: true, orders: orders })
    }

    const togglePopup = () => {
        const copy = { ...popup };

        copy.show = !popup.show;

        setPopup(copy);
    }

    const afterDelete = () => {
        getOrders();
    }

    return (
        <>
            <div className="container mt-3 mb-1">
                <div className="row justify-content-center">
                    {orders.map((order) => (
                        <Order order={order} key={order.id} handleDeletePopup={handleDeletePopup} />
                    ))}
                    <OrderDeletePopup popup={popup} togglePopup={togglePopup} afterDelete={afterDelete} />
                </div>
            </div>
        </>
    );
};

export default OrderList;