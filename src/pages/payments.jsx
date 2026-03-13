import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Payments() {

  const [payments, setPayments] = useState([]);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // useEffect(() => {
  //   axios.get("https://ecommerceapp-backend-ylw0.onrender.com/ECommerce/payment/all")
  //     .then(res => {
  //       setPayments(res.data);
  //     });
  // }, []);

  useEffect(() => {

    const fetchPayments = async () => {

      try {

        const res = await axios.get(
          "https://ecommerceapp-backend-ylw0.onrender.com/ECommerce/payment/all"
        );

        setPayments(res.data);
        setMessage("Payments loaded successfully");

      } catch (error) {

        console.error(error);
        setErrorMessage("Failed to load payments");

      }

    };

    fetchPayments();

  }, []);

  return (
    <div>
      <h2>Payments</h2>
      {payments.length === 0 && (
        <p className="text-gray-600">No payments found.</p>
      )}
      {payments.map((payment) => (
        <div key={payment.id} className="border p-4 mb-2">

          <p>Order ID: {payment.razorpayOrderId}</p>
          <p>Amount: ₹{payment.amount}</p>
          <p>Currency: {payment.currency}</p>
          <p>Status: {payment.status}</p>

        </div>
      ))}
    </div>
  );
}