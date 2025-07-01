const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ProductRoute = require('./routes/product.route.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/products', ProductRoute);

// --- Mongoose Lazy Connection ---
let cached = global.mongoose || { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const MONGO_URI = "mongodb+srv://aravindprahash19072004:Aravind1917@cluster0.ezlfzwt.mongodb.net/test?retryWrites=true&w=majority";
    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false,
    }).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// Exported handler for Vercel
module.exports = async (req, res) => {
  try {
    await connectDB();       // Wait for DB before handling route
    return app(req, res);    // Pass request to Express
  } catch (err) {
    console.error("MongoDB Connect Error:", err);
    res.status(500).json({ error: "MongoDB connection failed" });
  }
};

// Allow global caching for re-use
if (!global.mongoose) {
  global.mongoose = cached;
}
