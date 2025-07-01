const express = require('express')
const mongoose = require('mongoose');
const cors =require('cors');
const Product = require('./models/product.model.js');
const ProductRoute = require('./routes/product.route.js');
const app = express()


//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//Routes
app.use('/api/products', ProductRoute);




mongoose.connect("mongodb+srv://aravindprahash19072004:Aravind1719@cluster0.czgpo5y.mongodb.net/")
    .then(() => {
        console.log("Connected to database!")
        app.listen(3000, () => {
            console.log("Server is running on port 3000")
        });
    })
    .catch(() => {
        console.log("Connection failed!")
    });