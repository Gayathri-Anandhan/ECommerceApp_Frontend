import { React, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBagIcon, ShoppingCartIcon, CubeTransparentIcon, CreditCardIcon, UserCircleIcon ,ChartBarIcon} from "@heroicons/react/24/solid";
import AnjayLogo from "../assets/Anjay_logo.png"
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const role = localStorage.getItem("role");
    console.log("Role:", role);
    const name = localStorage.getItem("name");
    const [user, setUser] = useState(null);
    const handleLogin = () => {
        setUser("John");
    };
    const navigate = useNavigate();

    return (
        <div className="bg-[#F5F1E8] min-h-screen p-10">
            {/* <div className="bg-gradient-to-r from-[#F5F1E8]-400 t-amber-500 p-10 rounded-3xl text-black shadow-lg mb-10"> */}
            <div className="bg-white p-10 rounded-3xl text-neutral-800 shadow-sm mb-10 border border-neutral-200">
                <div className="flex items-center gap-3 mb-3">
                    {/* <a className="navbar-brand fs-2" href="#"> */}
                    <img src={AnjayLogo} width="150" height="100"></img>
                    {/* </a> */}

                    <h1 className="text-4xl font-bold mb-2">Welcome to AnJayHub!</h1>
                    <div className="flex items-center gap-3">
                        {name ? (
                            <div onClick={() => navigate("/Login")} className="flex items-center gap-2 bg-neutral-100 px-4 py-2 rounded-full">
                                <UserCircleIcon className="w-6 h-6 text-neutral-700" />
                                <span className="text-neutral-800 font-medium">{name}</span>
                            </div>
                        ) : (
                            <div className="flex gap-3">
                                {/* <Link
                                    to="/login"
                                    className="text-neutral-700 hover:text-black font-medium"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-neutral-900 text-white px-4 py-2 rounded-lg hover:bg-neutral-800 transition"
                                >
                                    Register
                                </Link> */}
                            </div>
                        )}
                    </div>
                </div>
                {/* <p className="text-neutral-500 mb-6">Slay With Anjay!</p><br></br> */}
                <br></br>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition">
                        <div className="flex items-center gap-3 mb-3">
                            <ShoppingBagIcon className="w-7 h-7 text-neutral-800" />
                            <h2 className="text-2xl font-semibold mb-3 text-neutral-900">Explore Products</h2>
                        </div>
                        <p className="text-neutral-500 mb-4">Explore new products</p><br></br>
                        <button className="bg-neutral-900 text-gray px-4 py-2 rounded-lg hover:bg-neutral-800 transition" onClick={() => navigate("/ProductsPage")}>View</button>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition">
                        <div className="flex items-center gap-3 mb-3">
                            <ShoppingCartIcon className="w-7 h-7 text-neutral-800" />
                            <h2 className="text-2xl font-semibold mb-3 text-neutral-900">My Cart</h2>
                        </div>
                        <p className="text-neutral-500 mb-4">View Items in Cart</p><br></br>
                        <button onClick={() => navigate("/Cart")} className="bg-neutral-900 text-gray px-4 py-2 rounded-lg hover:bg-neutral-800 transition">View Cart</button>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition">
                        <div className="flex items-center gap-3 mb-3">
                            <CubeTransparentIcon className="w-7 h-7 text-neutral-800" />
                            <h2 className="text-2xl font-semibold mb-3 text-neutral-900">My Orders</h2>
                        </div>
                        <p className="text-neutral-500 mb-4">Track your orders and status</p><br></br>
                        <button onClick={() => navigate("/Orders")} className="bg-neutral-900 text-gray px-4 py-2 rounded-lg hover:bg-neutral-800 transition">View Orders</button>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition">
                        <div className="flex items-center gap-3 mb-3">
                            <CreditCardIcon className="w-7 h-7 text-neutral-800" />
                            <h2 className="text-2xl font-semibold mb-3 text-neutral-900">My Payments</h2>
                        </div>
                        <p className="text-neutral-500 mb-4">Manage your payment details securely</p><br></br>
                        <button onClick={() => navigate("/payments")} className="bg-neutral-900 text-gray px-4 py-2 rounded-lg hover:bg-neutral-800 transition">Manage Payments</button>
                    </div>
                    {role === "admin" && (
                    <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition">
                        <div className="flex items-center gap-3 mb-3">
                            <ChartBarIcon className="w-7 h-7 text-neutral-800" />
                            <h2 className="text-2xl font-semibold mb-3 text-neutral-900">Admin Dashboard</h2>
                        </div>
                        <p className="text-neutral-500 mb-4">For Admin users only</p><br></br>
                        <button onClick={() => navigate("/ProductDetailsList")} className="bg-neutral-900 text-gray px-4 py-2 rounded-lg hover:bg-neutral-800 transition">View</button>
                    </div>
                    )}
                </div>
            </div>
        </div >
    );
}