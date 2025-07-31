const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('./catchAsyncError');
const jwt = require("jsonwebtoken");
const AsyncCatchError = require('./catchAsyncError');
const User = require('../model/user');

exports.isAuthorized = (AsyncCatchError(async(req,res,next)=>{
  console.log("Welcome at isautherized  function")
         
        const tokenObj = req.cookies;
         const token  = tokenObj.token
        console.log("token is ",token);
        if (!token) {
            return next(new ErrorHandler("Please login first",401));
        }
         try {
            const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
        // console.log("decode is ",decode)
        req.user = await User.findById(decode.id);
        console.log("Welcome after isauthorized function")

        next();
         } catch (error) {
            console.log("the error is comming",error)
         }
        

}));