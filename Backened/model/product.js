const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter your product Name"],
  },
  description: {
    type: String,
    required: [true, "Enter your product description"],
  },
  category: {
    type: String,
    required: [true, "Enter choose product Category"],
  },
  tags: {
    type: String,
  },
  originalPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
    required: [true, "Enter your product DiscountPrice"],
  },
  stock: {
    type: String,
    required: [true, "Enter your product Stock"],
  },
  images: [
    {
      type: String,
    },
  ],
  shopeId: {
      type:String,
      required:true
  },
  reviews:[
    {
   user: {
    type:Object,
   },
   rating:{
    type:Number
   },
   comment:{
    type:String
   },
     productId:{
      type:String
   
   }
  }
  ],
  rating:{
    type:Number
  },
  shop: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
