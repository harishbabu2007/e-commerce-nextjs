const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: mongoose.Decimal128,
  },
  purchases: {
    type: Number,
  },
  url: {
    type: String,
  },
  category: {
    type: String,
  },
});

module.exports =
  mongoose.models.Products || mongoose.model("Products", ProductSchema);
