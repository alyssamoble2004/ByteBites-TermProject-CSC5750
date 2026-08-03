import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderHistory.css";

function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const userEmail = localStorage.getItem("userEmail");

    useEffect(() => {
        if (!userEmail) {
            navigate("/");
            return;
        }

        async function fetchOrders() {
            try {
                const response = await fetch(`https://bytebites-termproject-csc5750.onrender.com/api/orders/${encodeURIComponent(userEmail)}`);

                if (!response.ok) {
                    throw new Error(`Failed to load order history: ${response.status}`);
                }

                const data = await response.json();
                setOrders(data || []);
            } catch (error) {
                console.error("Error fetching orders:", error);
                setOrders([]);
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, [navigate, userEmail]);

    if (loading) {
        return <div>Loading your order history...</div>;
    }

    const sortedOrders = [...orders].sort((a, b) => {
        const dateA = new Date(a.createdAt || a.date || 0).getTime();
        const dateB = new Date(b.createdAt || b.date || 0).getTime();
        return dateB - dateA;
    });

    if (!sortedOrders.length) {
        return (
            <div className="order-history-page">
                <div className="top-section">
                    <h1>Your Order History</h1>
                </div>
                <div className="order-history-empty-state">
                    <p>You have no past orders.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="order-history-page">
            <div className="top-section">
                <h1>Your Order History</h1>
                <p>Review your most recent pickup orders at a glance.</p>
            </div>

            <div className="order-history-list">
                {sortedOrders.map((order) => {
                    const orderDate = order.createdAt ? new Date(order.createdAt) : new Date(order.date || Date.now());
                    const orderTotal = order.totalPrice ?? order.total ?? 0;

                    return (
                        <div key={order._id} className="order-card">
                            <div className="order-card-header">
                                <p className="order-date">Order Date: {orderDate.toLocaleString()}</p>
                                <p className="order-total">Total: ${orderTotal.toFixed(2)}</p>
                            </div>
                            <ul className="order-items">
                                {order.items.map((item) => (
                                    <li key={item.id ?? `${item.name}-${item.quantity}`} className="order-item">
                                        {item.quantity} x {item.name} - ${item.price.toFixed(2)} each
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default OrderHistory;
