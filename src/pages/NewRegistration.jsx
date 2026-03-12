import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";

export default function NewRegistration() {
    const location = useLocation();
    const { id } = useParams();
    // const modeFromState = location.state?.mode;
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        phoneno: "",
        email: "",
        username: "",
        password: "",
        role: ""
    });

    const navigate = useNavigate(); 
    // const { id } = useParams();
    // const location = useLocation();
    const from = location.state?.from?.pathname;
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const [isSignup, setIsSignup] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = "https://ecommerceapp-backend-ylw0.onrender.com/ECommerce/api/auth/sign-up";
            console.log("Submitting data:", formData);
            const response = await axios.post(url, formData);
            alert("Registration successful!")
            navigate("/login");
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message || "Login failed");
            } else {
                alert("Server not reachable");
            }
        }
    };
    return (
        <div className="bg-[#F5F1E8] p-15 rounded-3xl text-neutral-800 shadow-sm mb-10 border border-neutral-200">
            {!isLogin && (
                <div className="text-center mt-2">
                    <button type="button" className="btn btn-link" onClick={() => setIsLogin(true)}>
                        Back to Login
                    </button>
                </div>
            )}
            <form className="container my-8" align="center" onSubmit={handleSubmit}>
                <h2 className="text-4xl font-bold mb-2">NEW REGISTRATION</h2>
                <label className="Block text-sm font-medium text-neutral-700 mb-2">Name:</label>
                <input className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-gray focus:ring-2 focus:ring-neutral-800 focus:border-neutral-800 transition bg-white" type="text" name="name" value={formData.name} onChange={handleChange} /><br /><br />

                <label className="Block text-sm font-medium text-neutral-700 mb-2">E-Mail Id:</label>
                <input className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-gray focus:ring-2 focus:ring-neutral-800 focus:border-neutral-800 transition bg-white" type="text" name="email" value={formData.email} onChange={handleChange} /><br /><br />

                <label>Mobile No:</label>
                <input className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-gray focus:ring-2 focus:ring-neutral-800 focus:border-neutral-800 transition bg-white" type="number" name="phoneno" value={formData.phoneno} onChange={handleChange} /><br /><br />

                <label className="Block text-sm font-medium text-neutral-700 mb-2">Username</label>
                <input className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-gray focus:ring-2 focus:ring-neutral-800 focus:border-neutral-800 transition bg-white" type="text" name="username" value={formData.username} onChange={handleChange} /><br /><br />

                <label className="block text-sm font-medium text-neutral-700 mb-2">Password</label>
                <input className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-gray focus:ring-2 focus:ring-neutral-800 focus:border-neutral-800 transition bg-white" type="password" name="password" value={formData.password} onChange={handleChange} /><br /><br />
                <label className="block text-sm font-medium text-neutral-700 mb-2">Role:</label>
                <input className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-gray focus:ring-2 focus:ring-neutral-800 focus:border-neutral-800 transition bg-white" placeholder="admin / user" type="text" name="role" value={formData.role} onChange={handleChange} /><br /><br />
                <button type="submit" className="bg-neutral-900 text-white px-4 py-2 rounded-lg hover:bg-neutral-800 transition">Submit</button>
            </form>

        </div>
    );
}