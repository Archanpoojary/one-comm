const express = require('express');
const cors = require('cors');
require('./db/config');
// const mongoose = require('monogoose');
const User = require("./db/User");
const Product = require("./db/Product");

const app = express();

app.use(express.json())
app.use(cors());

app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    resp.send(result);
});

app.post("/login", async (req, resp) => {
    console.log(req.body)
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            resp.send(user)
        } else {
            resp.send({ result: 'no user found' })
        }
    } else {
        resp.send({ result: 'No user found' })
    }
});

app.post("/add-product", async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result)
});

app.get("/products", async (req, resp) => {
    let products = await Product.find();
    if (products.length > 0) {
        resp.send(products)
    } else {
        resp.send({ result: "No products found" })
    }
});

app.delete("/product/:id", async (req, resp) => {
// resp.send(req.params.id);
const result= await Product.deleteOne({_id:req.params.id})
resp.send(result);
// console.warn("deleted ");
});

app.get("/product/:id",async (req,resp)=>{
    let result = await Product.findOne({_id:req.params.id});
    if(result)
{
    resp.send(result)
}else{
    resp.send({result:"No Record found"})
}

})

app.put("/product/:id", async (req,resp)=>{
    let result= await Product.updateOne(
        {_id: req.params.id}, 
        {
            $set:req.body
        }
        )
        resp.send(result)
    
})



// const connectDB= async()=>{
//     mongoose.connect('mongodb://localhost:27017/e-comm'); //to connect mango to nodejs cmd
//     const productSchema= new mongoose.Schema({});
//     const product= mongoose.model('product',productSchema);  
//     cost data = await product.find();
//     console.warn(data);
//  }
//  connectDB();

// app.get("/",(req,resp)=>{
// resp.send("app is working...")
// });

app.listen(5000)