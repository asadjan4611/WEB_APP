const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('./catchAsyncError');
const jwt = require("jsonwebtoken");
const AsyncCatchError = require('./catchAsyncError');
const User = require('../model/user');

exports.isAuthorized = (AsyncCatchError(async(req,res,next)=>{
        const token = req.cookies;
        // console.log("token is ",token);
        if (!token) {
            return next(new ErrorHandler("Please login first",401));
        }
        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decode.id);
        next();

}));