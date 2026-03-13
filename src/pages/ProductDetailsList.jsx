import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Edit2Icon, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function Dashboard() {
    const [properties, setproperties] = useState([]);
    const [rows, setRows] = useState([]);
    const handleDelete = async (id) => {
        if (window.confirm("Are u sure deleting this property?") === true) {
            try {
                const resp = await axios.delete(`https://ecommerceapp-backend-ylw0.onrender.com/ECommerce/api/products/deleteProducts?id=${id}`);
                setRows((prev) =>
                    prev.filter((row) =>
                        row.id !== id));
                alert("Product deleted successfully!")
            } catch (err) {
                console.error("Delete Failed")
            }
        }
    };

    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/add-product/${id}`);
    };

    const [filters, setFilters] = useState({
        minPrice: "",
        maxPrice: ""
    });

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const filteredProperties = properties.filter(prop => {
        const matchesMinPrice = filters.minPrice ? prop.price >= parseFloat(filters.minPrice) : true;
        const matchesMaxPrice = filters.maxPrice ? prop.price <= parseFloat(filters.maxPrice) : true;

        return matchesMinPrice && matchesMaxPrice;
    });

    useEffect(() => {
        axios.get("https://ecommerceapp-backend-ylw0.onrender.com/ECommerce/api/products/allproducts").then((res) => setproperties(res.data)).catch((err) => console.log("Error fetching properties", err));
    }, []);

    return (
        <div className="bg-[#F5F1E8] min-h-screen p-10">
            {/* <div className="bg-[#F5F1E8] p-15 rounded-3xl text-neutral-800 shadow-sm mb-10 border border-neutral-200"> */}

                <h2 className="text-4xl font-bold mb-2">Admin DashBoard</h2><br></br>
                <button className="primary-btn" onClick={() => navigate("/ProductDetails")}><PlusIcon className="w-6 h-6"></PlusIcon>Add New Product</button><br></br>
                <br></br><br></br>
                <div className="bg-white p-10 rounded-3xl text-neutral-800 shadow-sm mb-10 border border-neutral-200">
                    <div className="row mb-3">
                        
                        <div className="flex m-4 col-md-2 gap-4">
                            <label className="w-40">Minimum Price</label>
                            <input
                                type="number"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neutral-800 outline-none"
                                placeholder="Min Price"
                                name="minPrice"
                                value={filters.minPrice}
                                onChange={handleFilterChange}
                            />
                        
                            <label className="w-40">Maximum Price</label>
                            <input
                                type="number"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neutral-800 outline-none"
                                placeholder="Max Price"
                                name="maxPrice"
                                value={filters.maxPrice}
                                onChange={handleFilterChange}
                            />
                       
                            <button
                                className="primary-btn"
                                onClick={() => setFilters({ minPrice: "", maxPrice: "" })}
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>Product ID</th>
                                <th>Product Name</th>
                                <th>Description</th>
                                <th>Price</th>   
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProperties.length > 0 ? (
                                filteredProperties.map((prop) => (
                                    <tr key={prop.id}>
                                        <td>{prop.id}</td>
                                        <td>{prop.ProductName}</td>
                                        <td>{prop.description}</td>
                                        <td>{prop.price}</td>
                                 
                                        <td className="flex">
                                            <Edit2Icon size={20} className="me-2 text-primary" style={{ cursor: "pointer" }} onClick={() => handleEdit(prop.id)}
                                            />
                                            <Trash2 size={20} className="me-2 text-danger" style={{ cursor: "pointer" }} onClick={() => handleDelete(prop.id)} />
                                        </td>
                                    </tr>
                                ))

                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center">
                                        No products found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            
        </div>
    )
}