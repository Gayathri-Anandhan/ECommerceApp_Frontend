import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Orders() {

    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // const handlePayment = async (item, index) => {

    //     const response = await axios.post(
    //         `https://ecommerceapp-backend-ylw0.onrender.com/ECommerce/payment/create-order?amount=${item.price}`
    //     );

    //     const order = response.data;

    //     const options = {
    //         key: "rzp_test_SP6YnALebZmwaG",
    //         amount: order.amount,
    //         currency: order.currency,
    //         order_id: order.id,

    //         handler: function (response) {

    //             const updatedOrders = [...orders];

    //             updatedOrders[index].status = "PAID";

    //             localStorage.setItem("orders", JSON.stringify(updatedOrders));

    //             setOrders(updatedOrders);

    //             console.log("Payment Success", response);
    //         }
    //     };

    const handlePayment = async (item, index) => {

        try {

            const response = await axios.post(
                `https://ecommerceapp-backend-ylw0.onrender.com/ECommerce/payment/create-order?amount=${item.price}`
            );

            const order = response.data;

            const options = {
                key: "rzp_test_SP6YnALebZmwaG",
                amount: order.amount,
                currency: order.currency,
                order_id: order.id,

                handler: function (response) {

                    const updatedOrders = [...orders];
                    updatedOrders[index].status = "PAID";

                    localStorage.setItem("orders", JSON.stringify(updatedOrders));
                    setOrders(updatedOrders);

                    setMessage("Payment successful!");
                    console.log("Payment Success", response);
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {

            console.error(error);
            setErrorMessage("Payment failed. Please try again.");

        }
    };

    // const rzp = new window.Razorpay(options);
    // rzp.open();

useEffect(() => {
    const data = JSON.parse(localStorage.getItem("orders") || "[]");

    const updated = data.map(o => ({
        ...o,
        status: o.status || "PENDING"
    }));

    setOrders(updated);
}, []);

return (
    <div>
        <h2>My Orders</h2>
        {orders.length === 0 && (
            <p className="text-gray-600">No orders yet.</p>
        )}
        {orders.map((item, index) => (
            <div
                key={index}
                className="flex items-center gap-4 mb-4 border p-4 rounded-lg"
            >
                <img src={item.imageUrl} alt={item.productName} width="80" />

                <div>
                    <h3>{item.productName}</h3>
                    <p>${item.price}</p>
                    <p>Status: {item.status || "PENDING"}</p>

                    {item.status === "PAID" ? (
                        <button
                            disabled
                            className="primary-btn"
                        >
                            Paid
                        </button>
                    ) : (
                        <button
                            onClick={() => handlePayment(item, index)}
                            className="primary-btn"
                        >
                            Pay Now
                        </button>
                    )}
                </div>
            </div>
        ))}
        {message && <p className="text-green-600 mt-3">{message}</p>}
        {errorMessage && <p className="text-red-600 mt-3">{errorMessage}</p>}
    </div>
);
}