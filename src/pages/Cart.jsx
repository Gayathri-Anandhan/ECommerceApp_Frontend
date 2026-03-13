import React, { useEffect, useState } from "react";
export default function Cart() {

    const [cartItems, setCartItems] = useState([]);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        console.log("Cart Items:", cart);
        setCartItems(cart);
    }, []);

    const totalPrice = cartItems.reduce(
        (total, item) => total + Number(item.price || 0),
        0
    );

    const handleCheckout = () => {

        try {

            const cart = JSON.parse(localStorage.getItem("cart") || "[]");
            const orders = JSON.parse(localStorage.getItem("orders") || "[]");

            if (cart.length === 0) {
                setErrorMessage("Cart is empty.");
                return;
            }

            const newOrders = [...orders, ...cart];

            localStorage.setItem("orders", JSON.stringify(newOrders));

            localStorage.removeItem("cart");

            setCartItems([]);
            setMessage("Order placed successfully!");

            setTimeout(() => {
                window.location.href = "/Orders";
            }, 1000);

        } catch (error) {
            console.error(error);
            setErrorMessage("Something went wrong during checkout.");
        }
    };

    return (

        <div>
            <h2>My Cart</h2>
            {cartItems.length === 0 && (
                <p className="text-gray-600">Your cart is empty.</p>
            )}

            {cartItems.map((item, index) => (
                <div
                    key={item.id + "-" + index}
                    className="flex items-center gap-6 border p-4 rounded-lg mb-4"
                >
                    <img
                        src={item.imageUrl}
                        alt={item.productName}
                        className="w-24 h-24 object-contain"
                    />

                    <div>
                        <h3 className="font-semibold">{item.productName}</h3>
                        <p>${item.price}</p>
                    </div>
                </div>

            ))}
            <h2>Total: {totalPrice}</h2>
            <button className="primary-btn" onClick={handleCheckout}>
                Checkout
            </button>
            {message && <p className="text-green-600 mt-2">{message}</p>}
            {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}

        </div>
    );
}