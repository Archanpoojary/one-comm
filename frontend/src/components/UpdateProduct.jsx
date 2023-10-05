import React from "react";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'

const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');

    const params = useParams();

    useEffect(() => {

        getProductDetails();
    }, [])

    const getProductDetails = async () => {
        console.warn(params);
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        // console.warn(result);/
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)

    }
    const updateProduct = async () => {
        console.warn(name, price, category, company);
    }
    return (
        <div>
            <h1>Update Product</h1>
            <input type="text" placeholder="Enter product name" className="inputBox" value={name} onChange={(e) => { setName(e.target.value) }} />

            <input type="text" placeholder="Enter product pricee" className="inputBox" value={price} onChange={(e) => { setPrice(e.target.value) }} />

            <input type="text" placeholder="Enter product category" className="inputBox" value={category} onChange={(e) => { setCategory(e.target.value) }} />

            <input type="text" placeholder="Enter product company" className="inputBox" value={company} onChange={(e) => { setCompany(e.target.value) }} />


            <button onClick={updateProduct} >Update Product</button>
        </div>
    );
}

export default UpdateProduct;