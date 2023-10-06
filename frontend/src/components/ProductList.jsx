import React from 'react';
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, [])
    const getProducts = async () => {
        let result = await fetch(`http://localhost:5000/products`);
        result = await result.json();
        setProducts(result);
    }
    // console.warn("products", products);

    const deleteProduct=async (id)=>{
        let  result= await fetch(`http://localhost:5000/product/${id}`,{
            method:"Delete"
        });
        result= result.json()
        if(result){
            getProducts();
            alert("record is deleted");
        }

    }

    return (
        <div className='product-list'>
            <h1>Product List</h1>
            <ul>
                <li>SI.no</li>
                <li>Name</li>
                <li>Price</li>
                <li>category</li>
                <li>Operation</li>
            </ul>
            {
                products.map((item,index)=>
                <ul key={item._id}>
                <li>{index+1}</li>
                <li>{item.name}</li>
                <li>${item.price}</li>
                <li>c{item.category}</li>
                <li><button onClick={()=>deleteProduct(item._id)}>Delete</button>

                <Link to={"/update/"+item._id}>Update</Link>
                </li>
            </ul>
                )
            }
        </div>
    );
}

export default ProductList;