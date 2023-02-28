const mongoose = require("mongoose");
const schema = mongoose.Schema({
  name: String,
  description: String,
  category: String,
  image: String,
  location: String,
  postedAt: String,
  price: Number,
});

const Prodmodule=mongoose.model("product",schema)
module.exports={Prodmodule}