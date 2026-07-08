import { useState } from "react";
import "./Login.css";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            alert("Please enter your email and password.");
            return;
        }

        alert("Login submitted!");
    };

    return (
        <div className="login-page">
            <header className="login-header">
                <h1>ByteBites Login</h1>
            </header>

            <div className="login-container">
                <h2>Sign In</h2>

                <form onSubmit={handleSubmit} className="login-form">

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

                    <button type="submit" className="login-btn">
                        Login
                    </button>

                </form>
            </div>

            <footer className="login-footer">
                © 2026 ByteBites Restaurant System
            </footer>
        </div>
    );
}

export default Login;
