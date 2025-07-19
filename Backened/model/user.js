const mongoose = require("mongoose");
 const bcrypt= require("bcrypt");
 const jwt = require("jsonwebtoken");

 const userSchema = new mongoose.Schema({
    name:{
         type:String,
        required:[true,"Please enter your name"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"]
    },
    passwword:{
        type:String,
        required:[true,"Please enter your password"],
        minLength:[4,"password should be grater then 4 characters"],
        select:false,
    },
    phoneNumber:{
        type:String,
    },
    addresses:[
        {
            country:{

            },
            city:{
                type:String
            },
            address1:{
                type:String

            },
            address2:{
                type:String

            },
            zipCode:{
                type:Number

            },
            addressType:{
                type:String
                
            }
        }
    ],
    role:{
        type:String,
        default:"user"
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
    url:{
        type:String,
        required:true
    },

 },
 
 createdAt:{
    type:Date,
    default:Date.now
 },
resstPasswordToken:String,
  restePassowrdTime:Date
});

 module.exports =mongoose.model("User",userSchema); 