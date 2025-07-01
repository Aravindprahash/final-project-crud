const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ProductRoute = require('./routes/product.route.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/products', ProductRoute);

// Connect to MongoDB only once (cache connection)
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect("mongodb+srv://aravindprahash19072004:Aravind1917@cluster0.ezlfzwt.mongodb.net/");
    isConnected = true;
    console.log("Connected to MongoDB ✅");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

// Export Express app for Vercel
module.exports = async (req, res) => {
  await connectDB(); // Ensure DB is connected before handling request
  return app(req, res);
};
