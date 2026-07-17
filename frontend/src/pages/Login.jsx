import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const response = await api.post("/auth/login", formData);

            // Save Token
            localStorage.setItem("token", response.data.token);

            // Save User
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            alert("Login Successful");

            navigate("/dashboard");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Login Failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 flex justify-center items-center">

                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">

                    <h2 className="text-3xl font-bold text-center mb-6">
                        Login
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                            required
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                            required
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                        >

                            {
                                loading
                                    ? "Logging In..."
                                    : "Login"
                            }

                        </button>

                    </form>

                    <p className="text-center mt-5">

                        Don't have an account?

                        <Link
                            to="/signup"
                            className="text-blue-600 ml-2"
                        >
                            Signup
                        </Link>

                    </p>

                </div>

            </div>

        </>
    );
}

export default Login;