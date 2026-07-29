import { useState } from "react";

function PlaceOrder({ onSuccess }) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !phone || !address) {
            setMessage("Please fill all details.");
            return;
        }

        setMessage("Order placed successfully!");

        if (onSuccess) {
            setTimeout(onSuccess, 600);
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

            {message && <p className={`place-order-message ${message.includes("successfully") ? "success" : "error"}`}>{message}</p>}
        </div>
    );
}

export default PlaceOrder;
