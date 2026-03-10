import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Orders() {

    const [orders, setOrders] = useState([]);

    const handlePayment = async (item, index) => {

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

                console.log("Payment Success", response);
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

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

            {orders.map((item, index) => (
                <div
                    key={index}
                    className="flex items-center gap-4 mb-4 border p-4 rounded-lg"
                >
                    <img src={item.imageUrl} width="80" />

                    <div>
                        <h3>{item.productName}</h3>
                        <p>${item.price}</p>
                        <p>Status: {item.status || "PENDING"}</p>

                        {item.status === "PAID" ? (
                            <button
                                disabled
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Paid
                            </button>
                        ) : (
                            <button
                                onClick={() => handlePayment(item, index)}
                                className="bg-black text-white px-4 py-2 rounded"
                            >
                                Pay Now
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}