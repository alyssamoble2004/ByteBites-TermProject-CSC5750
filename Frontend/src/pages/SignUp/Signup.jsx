import { useState } from "react";
import "./Signup.css";

function Signup() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        verifyPassword: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.verifyPassword) {
        alert("Passwords do not match");
        return;
    }

    if (formData.password.length < 8) {
        alert("Password must be at least 8 characters long");
        return;
    }

    const signupData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
    };

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(signupData),
        });

        const data = await response.json();
        console.log("Server response:", data);

        if (data.success) {
            alert("Signup successful!");
        } else {
            alert(data.message || "Signup failed");
        }
    } catch (error) {
        console.error("Signup error:", error);
        alert("Error connecting to server");
    }
};

    return (
        <div className="signup-page">
            <header className="signup-header">
                <h1>ByteBites Signup</h1>
            </header>

            <div className="signup-container">
                <h2>Create Account</h2>

                <form onSubmit={handleSubmit} className="signup-form">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="verifyPassword"
                        placeholder="Verify Password"
                        value={formData.verifyPassword}
                        onChange={handleChange}
                    />

                    <button type="submit" className="signup-btn">
                        Sign Up
                    </button>

                    <p className="login-link">
                        Already have an account? <a href="/">Login</a>
                    </p>
                </form>
            </div>

            <footer className="signup-footer">
                © 2026 ByteBites Restaurant System
            </footer>
        </div>
    );
}

export default Signup;