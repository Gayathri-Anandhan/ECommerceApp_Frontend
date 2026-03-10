import { React, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBagIcon, ShoppingCartIcon, CubeTransparentIcon, CreditCardIcon, UserCircleIcon } from "@heroicons/react/24/solid";
// import EarPods from "../assets/EarPods.jpg"
// import Product2 from "../assets/Product2.jpg"
// import Product3 from "../assets/Product3.jpg"
// import Product4 from "../assets/Product4.jpg"
// import Product5 from "../assets/Product5.jpg"
// import Product6 from "../assets/Product6.jpg"
import axios from "axios";
import { useEffect } from "react"


export default function ProductsPage() {
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const addToCart = (product) => {

        const cart = JSON.parse(localStorage.getItem("cart") || "[]");

        const item = {
            id: product.id,
            productName: product.productName,
            price: Number(product.price),
            imageUrl: product.imageUrl
        };

        cart.push(item);

        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Product added to cart");
    };

    // const products = [
    //     { id: 1, productName: "EarPods", price: 1, imageUrl: EarPods },
    //     { id: 2, productName: "Headphone", price: 1, imageUrl: Product2 },
    //     { id: 3, productName: "Speaker", price: 1, imageUrl: Product3 },
    //     { id: 4, productName: "Mouse", price: 1, imageUrl: Product4 },
    //     { id: 5, productName: "Keyboard", price: 1, imageUrl: Product5 },
    //     { id: 6, productName: "Smart Watch", price: 1, imageUrl: Product6 }
    // ];


    useEffect(() => {
        axios.get("https://ecommerceapp-backend-ylw0.onrender.com/ECommerce/api/products/allproducts")
            .then(res => {
                console.log(res.data);
                setProducts(res.data);
            })
            .catch(err => {
                console.error("Error loading products", err);
            });
    }, []);

    return (
        <div className="bg-[#F5F1E8] min-h-screen p-10">
            <Link to="/cart">Cart</Link>
            <div className="bg-white p-10 rounded-3xl text-neutral-800 shadow-sm mb-10 border border-neutral-200">
                <div className="flex items-center gap-3 mb-3">
                </div>
                <br></br>
                <div className="grid md:grid-cols-2 gap-8">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition"
                        >
                            <img
                                src={product.imageUrl}
                                alt={product.productName}
                                className="w-full h-60 object-contain bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4"
                            />

                            <h3 className="font-semibold text-lg">{product.productName}</h3>

                            <p className="text-gray-500">${product.price}</p>

                            <button
                                onClick={() => addToCart(product)}
                                className="flex items-center bg-neutral-900 text-gray px-4 py-2 rounded-lg hover:bg-neutral-800 transition"
                            >
                                <ShoppingCartIcon className="w-7 h-7 text-neutral-800" />
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>


            </div>

        </div >
    );
}