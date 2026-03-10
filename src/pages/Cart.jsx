import React, { useEffect, useState } from "react";
export default function Cart() {

    const [cartItems, setCartItems] = useState([]);

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

        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const orders = JSON.parse(localStorage.getItem("orders") || "[]");

        const newOrders = [...orders, ...cart];

        localStorage.setItem("orders", JSON.stringify(newOrders));

        localStorage.removeItem("cart");

        setCartItems([]); // update UI

        alert("Order placed!");

        window.location.href = "/Orders";
    };

    
    return (
        // <div className="flex items-center gap-6 border p-4 rounded-lg shadow-sm mb-4 bg-white">
        // <div className="p-10 bg-gray-100 min-h-screen">
        <div>
            <h2>My Cart</h2>

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
            <button onClick={handleCheckout}>
                Checkout
            </button>
            
        </div>
    );
}