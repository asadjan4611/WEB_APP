const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const shopSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, "Please enter your name!"],
  },
  email:{
    type: String,
    required: [true, "Please enter your email!"],
  },
  password:{
    type: String,
    required: [true, "Please enter your password"],
    minLength: [4, "Password should be greater than 4 characters"],
    select: false,
  },
  phoneNumber:{
    type: Number,
    required:true
  },
    zipCode:{
    type: Number,
    required:true
  },
  description:{
    type:String
  },
  address:{
    type:String,
    required:true
  },
  avatar:{
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
 },
  role:{
    type: String,
    default: "seller",
  },
 
 createdAt:{
  type: Date,
  default: Date.now(),
 },

  resetPasswordToken: String,
 resetPasswordTime: Date,

});

//  Hash password
shopSchema.pre("save", async function (next){
  if(!this.isModified("password")){
     return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});
//compare password
shopSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}; 


// jwt token
shopSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id}, process.env.JWT_SECRET_KEY,{
    expiresIn: process.env.JWT_EXPIRES,
  });
};


module.exports = mongoose.model("Shop", shopSchema);