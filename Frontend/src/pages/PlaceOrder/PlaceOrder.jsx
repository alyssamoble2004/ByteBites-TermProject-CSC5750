import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PlaceOrder.css";

function PlaceOrder() {
    const navigation = useNavigate();
    const { state } = useLocation();
    const orderItems = state?.orderItems || [];

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [payment, setPayment] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !phone || !address || !payment) {
            setMessage("Please fill all details.");
            return;
        }

        try {
            const response = await fetch("https://bytebites-termproject-csc5750.onrender.com/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userEmail: localStorage.getItem("userEmail"),
                    items: orderItems,
                    totalPrice: orderItems.reduce((total, item) => total + item.price * item.quantity, 0),
                    name,
                    phone,
                    address,
                    payment,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to place order.");
            }

            setMessage(`🎉 Thank you, ${name}! Your order has been placed successfully.`);

            setTimeout(() => {
                navigation("/menu");
            }, 800);

        } catch (error) {
            console.error("Error placing order:", error);
            setMessage("Failed to place order. Please try again.");
        }
    };

    return (
        <div className="place-order-page">
            <div className="place-order-card">
                <h2>ByteBites - Place Your Order</h2>
                <form onSubmit={handleSubmit} className="place-order-form">
                    <input
                        className="place-order-input"
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        className="place-order-input"
                        type="tel"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />

                    <textarea
                        className="place-order-textarea"
                        placeholder="Delivery Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows="4"
                        required
                    />

                    <select
                        className="place-order-select"
                        value={payment}
                        onChange={(e) => setPayment(e.target.value)}
                        required
                    >
                        <option value="">Select Payment Method</option>
                        <option value="Cash on Delivery">Cash on Delivery</option>
                        <option value="Credit/Debit Card">Credit/Debit Card</option>
                        <option value="UPI">UPI</option>
                    </select>

                    <button type="submit" className="place-order-submit">
                        Place Order
                    </button>
                </form>

                {message && (
                    <p className={`place-order-message ${message.includes("successfully") ? "success" : "error"}`}>
                        {message}
                    </p>
                )}

                <p className="place-order-creator">Created by: Zuhara Begum</p>
            </div>
        </div>
    );
}

export default PlaceOrder;
