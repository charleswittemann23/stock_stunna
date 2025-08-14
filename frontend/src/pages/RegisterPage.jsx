import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import './RegisterPage.css'
export default function RegisterPage() {
    const { register, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        password_confirm: ""
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError("");
    };

    const validateForm = () => {
        // Check if all required fields are filled
        if (!formData.username.trim() || !formData.email.trim() || 
            !formData.first_name.trim() || !formData.last_name.trim() || 
            !formData.password.trim() || !formData.password_confirm.trim()) {
            setError("Please fill in all fields");
            return false;
        }

        // Check if passwords match
        if (formData.password !== formData.password_confirm) {
            setError("Passwords need to match!");
            return false;
        }

        // Basic password validation
        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters long");
            return false;
        }

        // Email validation (basic)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError("Please enter a valid email address");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            // Pass the full registration data (excluding password_confirm)
            const registrationData = {
                username: formData.username.trim(),
                email: formData.email.trim(),
                first_name: formData.first_name.trim(),
                last_name: formData.last_name.trim(),
                password: formData.password,
                password_confirm: formData.password_confirm
            };

            const result = await register(registrationData);

            if (!result.success) {
                setError(result.error || "Registration failed. Please try again.");
            }
            // Navigation is handled by the useEffect when isAuthenticated becomes true
        } catch (err) {
            console.error("Unexpected error in handleSubmit:", err);
            setError("Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Create Account</h2>

                <div className="form-group">
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Username"
                        disabled={isLoading}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        disabled={isLoading}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        placeholder="First Name"
                        disabled={isLoading}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        placeholder="Last Name"
                        disabled={isLoading}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Password (min 8 characters)"
                        disabled={isLoading}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        name="password_confirm"
                        value={formData.password_confirm}
                        onChange={handleInputChange}
                        placeholder="Confirm Password"
                        disabled={isLoading}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`login-button ${isLoading ? 'loading' : ''}`}
                >
                    {isLoading ? "Creating Account..." : "Create Account"}
                </button>

                {error && (
                    <div className="error-message" role="alert">
                        {error}
                    </div>
                )}

                <div className="form-footer">
                    <p>
                        Already have an account? 
                        <button 
                            type="button" 
                            onClick={() => navigate('/login')} 
                            className="link-button"
                            disabled={isLoading}
                        >
                            Sign in here
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
}