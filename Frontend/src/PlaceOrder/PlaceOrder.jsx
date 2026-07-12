import { useState } from "react";

function PlaceOrder() {
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
    };

    return (
        <div>
            <h1>Place Your Order</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <br />

                <input
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <br />

                <textarea
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <br />

                <button type="submit">
                    Place Order
                </button>
            </form>

            <p>{message}</p>
        </div>
    );
}

export default PlaceOrder;
