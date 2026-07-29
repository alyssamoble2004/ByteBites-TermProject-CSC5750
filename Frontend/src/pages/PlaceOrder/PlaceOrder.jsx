import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PlaceOrder() {
    const navigation = useNavigate();
    const { state } = useLocation();
    const orderItems = state?.orderItems || [];

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !phone || !address) {
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
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to place order.");
            }

            setMessage("Order placed successfully!");

            setTimeout(() => {
                navigation("/menu");
            }, 800);
    
        } catch (error) {
            console.error("Error placing order:", error);
            setMessage("Failed to place order. Please try again.");
        }
    };

    return (
        <div className="place-order-card">
            <h2>Place Your Order</h2>
            <form onSubmit={handleSubmit} className="place-order-form">
                <input
                    className="place-order-input"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    className="place-order-input"
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <textarea
                    className="place-order-textarea"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <button type="submit" className="place-order-submit">
                    Place Order
                </button>
            </form>

            {message && (
                <p className={`place-order-message ${message.includes("successfully") ? "success" : "error"}`}>
                    {message}
                </p>
            )}
        </div>
    );
}

export default PlaceOrder;
