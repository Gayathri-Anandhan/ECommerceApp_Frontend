import React from "react";

export default function MyOrders() {

  const orders = [
    {
      id: 101,
      date: "03 Mar 2026",
      status: "PAID",
      total: 4500,
      items: [
        { id: 1, name: "iPhone 13", quantity: 1, price: 3500 },
        { id: 2, name: "Headphones", quantity: 2, price: 500 }
      ]
    },
    {
      id: 102,
      date: "01 Mar 2026",
      status: "CREATED",
      total: 2000,
      items: [
        { id: 3, name: "Smart Watch", quantity: 1, price: 2000 }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      <div className="space-y-6">
        {orders.map(order => (
          <div key={order.id} className="border rounded-xl p-5 shadow bg-white">

            <div className="flex justify-between mb-3">
              <div>
                <p className="font-semibold">Order #{order.id}</p>
                <p className="text-sm text-gray-500">{order.date}</p>
              </div>

              <span className={`px-3 py-1 text-sm rounded-full
                ${order.status === "PAID"
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"}`}>
                {order.status}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              {order.items.map(item => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹ {item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="text-right font-semibold mt-3">
              Total: ₹ {order.total}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}