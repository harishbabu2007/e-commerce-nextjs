const mongoose = require("mongoose");
const ProductsModel = require("../../../models/ProductsModel.js");

export default async function handler(req, res) {
  const products = await ProductsModel.find({});
  res.status(200).json(products);
}
