import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";

export default function Login() {
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

    const navigate = useNavigate(); // <-- navigation hook
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
            //     //  EDIT MODE
            //     if (id) {
            //         await axios.put(
            //             `https://realnest-backend-1.onrender.com/api/auth/updateUser?id=${id}`,
            //             formData
            //         );

            //         alert("User updated successfully!");
            //         navigate("/user-control");
            //         return; // stop further execution
            //     }

            const url = "http://localhost:8080/ECommerce/api/auth/sign-up";
            console.log("Submitting data:", formData);
            const response = await axios.post(url, formData);
      
        } catch (error) {
            console.error("Sign-Up:", error);
            //     alert("Operation failed! Check console for details.");
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
                <input className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-gray focus:ring-2 focus:ring-neutral-800 focus:border-neutral-800 transition bg-white" placeholder="admin / user" type="role" name="role" value={formData.role} onChange={handleChange} /><br /><br />
                <button type="submit" className="bg-neutral-900 text-gray px-4 py-2 rounded-lg hover:bg-neutral-800 transition">Submit</button>
            </form>

        </div>
    );
}