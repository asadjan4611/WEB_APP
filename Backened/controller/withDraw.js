const express = require("express");
const WithDraw = require("../model/withDraw");
const path = require("path");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const AsyncCatchError = require("../middleware/catchAsyncError");
const sendMail = require("../utils/sendMail");
const { isAuthorized, isSeller } = require("../middleware/auth");
const catchAsyncError = require("../middleware/catchAsyncError");
const Shop = require("../model/shop");


router.post("/create-withdraw-request",isSeller,catchAsyncError(async(req,res,next)=>{
    try {
        const {amount} = req.body;

        //   try {
        //       await sendMail({
        //         email: req.user.email,
        //         subject: "WithDraw Request",
        //        message: `Hello ${req.user.name}, Your withdraw request of ${amount}$ is processing. It will take 3days to 7days to processing! `,
        //       });
        //     } catch (error) {
        //       return next(new ErrorHandler(error.message, 500));
        //     }

        const data ={ seller:req.user,
            amount
        }
        const withdraw = await WithDraw.create(data);
              console.log("everything is okay");   
      const shop = await Shop.findById(req.user._id);
       const balance = shop.availableBalance;
       const remainingbalnace= balance-amount;
      shop.availableBalance = remainingbalnace;

      await shop.save({validateBeforeSave:false});

      res.status(201).json({
        success: true,
        withdraw,
      });
      console.log("everything is okay")
    } catch (error) {
              return next(new ErrorHandler(error, 400));
        
    }
}));
module.exports= router;
