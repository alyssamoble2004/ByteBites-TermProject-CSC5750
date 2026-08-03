import React, { useState } from "react";
import "./PlaceOrder.css";

function PlaceOrder() {

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        payment: ""
    });

    const [message, setMessage] = useState("");


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            const response = await fetch(
                "http://localhost:5000/orders",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(formData)
                }
            );


            const data = await response.json();


            setMessage("🎉 " + data.message);


            setFormData({
                name: "",
                phone: "",
                address: "",
                payment: ""
            });


        } catch (error) {

            setMessage("❌ Unable to place order. Please try again.");

        }

    };


    return (

        <div className="order-container">

            <h2>
                ByteBites - Place Your Order
            </h2>


            <form onSubmit={handleSubmit}>


                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />


                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />


                <textarea
                    name="address"
                    rows="4"
                    placeholder="Delivery Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />


                <select
                    name="payment"
                    value={formData.payment}
                    onChange={handleChange}
                    required
                >

                    <option value="">
                        Select Payment Method
                    </option>

                    <option value="Cash on Delivery">
                        Cash on Delivery
                    </option>

                    <option value="Credit/Debit Card">
                        Credit/Debit Card
                    </option>

                    <option value="UPI">
                        UPI
                    </option>

                </select>


                <button type="submit">
                    Place Order
                </button>


            </form>


            <p className="message">
                {message}
            </p>


            <p className="creator">
                Created by: Zuhara Begum
            </p>


        </div>

    );

}


export default PlaceOrder;