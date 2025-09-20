const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter your event product Name"],
  },
  description: {
    type: String,
    required: [true, "Enter your event  product description"],
  },
  category: {
    type: String,
    required: [true, "Enter choose event product Category"],
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
  start_date:{
    type:Date,
    required:true
  },
  end_date:{
    type:Date,
    required:true
  },
  status:{
  type:String,
  default:"Runnnig"
  },
  stock: {
    type: String,
    required: [true, "Enter your product Stock"],
  },
  images:[
        {
            public_id: {
                type: String,
                required: true,
              },
              url: {
                type: String,
                required: true,
              },
        },
    ],
  shopeId: {
      type:String,
      required:true
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


module.exports = mongoose.model('Event',eventSchema);