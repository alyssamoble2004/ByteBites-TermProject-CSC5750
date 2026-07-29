import { useEffect, useState } from "react";
import "./OrderHistory.css";

function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    //get user id email
    const userEmail = localStorage.getItem("userEmail");

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await fetch(`http://localhost:5000/api/orders/${userEmail}`);
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, [userEmail]);

    if (loading) {
        return <div>Loading your order history...</div>;
    }

    if (!orders.length) {
        return <div className="order-history-page">
            You have no past orders.</div>;
    }

    return (
        <div className="order-history-page">
            <h1>Your Order History</h1>

            {orders.map((order) => (
                <div key={order._id} className="order-card">
                    <p className="order-date">Order Date: {new Date(order.date).toLocaleString()}</p>
                    <p className="order-total">Total: ${order.total.toFixed(2)}</p>
                    <div className="order-items">
                        {order.items.map((item, index) => (
                            <li key={item.id} className="order-item">
                                {item.quantity} x {item.name} - ${item.price.toFixed(2)} each
                            </li>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default OrderHistory;
