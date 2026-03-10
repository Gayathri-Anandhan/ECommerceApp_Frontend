import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import { ArrowBigLeftIcon } from "lucide-react";

export default function AddProduct() {
    const [formData, setFormData] = useState({
        productName: "",
        description: "",
        price: "",
        imageUrl: "",
    });
    const [file, setFile] = useState(null);
    const { id } = useParams();

    // Get id from query params
    // const location = useLocation();
    // const queryParams = new URLSearchParams(location.search);
    // const id = queryParams.get("id"); // correct id

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataObj = new FormData();

        const productObj = {
            id: Number(id),
            productName: formData.productName,
            description: formData.description,
            price: Number(formData.price)
        };

        if (id) {

            // PUT API expects "product"
            formDataObj.append(
                "product",
                JSON.stringify(productObj)
            );

            if (file) {
                formDataObj.append("file", file);
            }

            await axios.put(
                `https://ecommerceapp-backend-ylw0.onrender.com/ECommerce/api/products/updateProducts?id=${id}`,
                formDataObj
            );

            alert("Product Updated Successfully");

        } else {

            // POST API expects "Product"
            formDataObj.append(
                "Product",
                JSON.stringify(productObj)
            );

            formDataObj.append("file", file);

            await axios.post(
                `https://ecommerceapp-backend-ylw0.onrender.com/ECommerce/api/products/saveProduct`,
                formDataObj
            );

            alert("Product Added Successfully");
        }
    };

    useEffect(() => {
        if (id) {
            axios.get(`https://ecommerceapp-backend-ylw0.onrender.com/ECommerce/api/products/viewproducts?id=${id}`)
                .then(res => {
                    console.log("API RESPONSE:", res.data);

                    setFormData({
                        productName: res.data.ProductName || "",
                        description: res.data.description || "",
                        price: res.data.price || "",
                        imageUrl: res.data.imageUrl || "",
                    });
                })
                .catch(err => console.log("Error fetching product", err));
        }
    }, [id]);

    return (
        <form onSubmit={handleSubmit}>
            <div className="bg-[#F5F1E8] p-15 rounded-3xl text-neutral-800 shadow-sm mb-10 border border-neutral-200">
                <div className="mb-4 flex items-center gap-4">
                    <Link className="flex items-center gap-2 text-neutral-800 hover:text-neutral-600" to="/ProductDetailsList"><ArrowBigLeftIcon size={20} />Back to Dashboard </Link>
                </div>
                <br></br>
                <div className="bg-white p-10 rounded-3xl text-neutral-800 shadow-sm mb-10 border border-neutral-200">

                    <div className="container my-5">

                        <div className="mb-4 flex items-center gap-4">
                            <label className="w-1/4 text-sm font-medium text-neutral-700 mb-2" htmlFor="productName">Name of the Product</label>
                            <input className="w-3/4 px-4 py-3 rounded-xl border border-neutral-300 focus:outline-gray focus:ring-2 focus:ring-neutral-800 focus:border-neutral-800 transition bg-white" type="text" name="productName" id="productName" value={formData.productName} onChange={handleChange} />
                        </div>
                        <div className="mb-4 flex items-center gap-4">
                            <label className="w-1/4 text-sm font-medium text-neutral-700 mb-2" htmlFor="Description">Description</label>
                            <input className="w-3/4 px-4 py-3 rounded-xl border border-neutral-300 focus:outline-gray focus:ring-2 focus:ring-neutral-800 focus:border-neutral-800 transition bg-white" type="text" name="description" id="Description" value={formData.description} onChange={handleChange} />
                        </div>

                        <div className="mb-4 flex items-center gap-4">
                            <label className="w-1/4 text-sm font-medium text-neutral-700 mb-2" htmlFor="Price" >Price</label>
                            <input className="w-3/4 px-4 py-3 rounded-xl border border-neutral-300 focus:outline-gray focus:ring-2 focus:ring-neutral-800 focus:border-neutral-800 transition bg-white" type="Number" name="price" id="Price" value={formData.price} onChange={handleChange} />
                        </div>


                        <div className="mb-4 flex items-center gap-4">

                            <label className="w-1/4 text-sm font-medium text-neutral-700 mb-2">Image Upload</label>
                            <input className="w-3/4 px-4 py-3 rounded-xl border border-neutral-300 focus:outline-gray focus:ring-2 focus:ring-neutral-800 focus:border-neutral-800 transition bg-white" type="file" onChange={(e) => setFile(e.target.files[0])} />

                            {formData.imageUrl && !file && (
                                <div className="mt-2">
                                    <img
                                        src={formData.imageUrl}
                                        alt="Product"
                                        style={{ width: "200px", height: "auto" }}
                                    />
                                </div>
                            )}
                        </div>
                        <br></br>

                    </div>

                </div>
                <button className="items-center bg-neutral-900 text-white px-4 py-2 rounded-lg hover:bg-neutral-800 transition" type="submit">Submit</button>
            </div>
        </form>
    );
}