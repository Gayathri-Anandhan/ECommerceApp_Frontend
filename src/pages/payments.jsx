import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Payments() {

  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios.get("https://ecommerceapp-backend-ylw0.onrender.com/ECommerce/payment/all")
      .then(res => {
        setPayments(res.data);
      });
  }, []);

  return (
    <div>
      <h2>Payments</h2>

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