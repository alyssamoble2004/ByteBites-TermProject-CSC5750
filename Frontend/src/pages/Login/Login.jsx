import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

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

        //if login is successful
        localStorage.setItem("userEmail", formData.email);
        navigate("/menu");

        //alert("Login submitted!");
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

                    <p className="signup-link">
                        Don't have an account? <a href="/signup">Sign Up</a>
                    </p>

                </form>
            </div>

            <footer className="login-footer">
                © 2026 ByteBites Restaurant System
            </footer>
        </div>
    );
}

export default Login;
