import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './pages/Homepage'
import Login from './pages/Login'
import NewRegistration from './pages/NewRegistration'
import ProductsPage from './pages/ProductsPage'
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ProductDetails from './pages/ProductDetails'
import ProductDetailsList from './pages/ProductDetailsList'
import 'bootstrap/dist/css/bootstrap.min.css';
import Orders from './pages/Orders.jsx'
import AddProduct from './pages/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import Payments from './pages/payments.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/NewRegistration" element={<NewRegistration/>}/>
        <Route path="/ProductsPage" element={<ProductsPage/>}/>
        <Route path="/ProductDetails" element={<ProductDetails/>}/>
        <Route path="/ProductDetailsList" element={<ProductDetailsList/>}/>
        <Route path="/Orders" element={<Orders/>}/>
        <Route path="/add-product/:id" element={<AddProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payments" element={<Payments />} />
      </Routes>
    </div>
  )
}

export default App
