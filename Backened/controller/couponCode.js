const express = require("express");
const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const router = express.Router();
const catchAsyncError = require("../middleware/catchAsyncError");
const { isSeller } = require("../middleware/auth");
const CouponCode = require("../model/CouponCode");

router.post(
  "/create-coupan",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      console.log("Welocme at this functions of creating the coupans");
      const namee = req.body.name;
      // console.log(namee)
      const isCoupan = await CouponCode.find({ namee });
      if (isCoupan.length !== 0) {
        return next(new ErrorHandler("Coupan is alreaty exist", 400));
      }
      const data = req.body;
      //   console.log(data)

      const coupanCode = await CouponCode.create(req.body);

      res.status(201).json({
        sucess: true,
        coupanCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.get(
  "/get-coupans/:id",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      console.log("welcome at get function ");
      const coupanId = req.params.id;
      const coupans = await CouponCode.find({
        "seller._id": coupanId,
      });
      //   console.log(coupans);

      res.status(200).json({
        sucess: true,
        coupans,
      });
    } catch (error) {
      return next(new ErrorHandler("Coupan code is not exist ", 401));
    }
  })
);

router.delete(
  "/delete-coupan/:id",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    const coupanId = req.params.id;
    const coupan = await CouponCode.findByIdAndDelete(coupanId);
    res.status(200).json({
      sucess: true,
      message: "Deleted Successfully",
    });
  })
);

router.get(
  "/coupan-verified/:name",
  catchAsyncError(async (req, res, next) => {
    try {
      const coupanName = req.params.name;
      const coupanCode = await CouponCode.findOne({ name: req.params.name });
      // console.log("everything is okay")
      res.status(200).json({
        success: true,
        coupanCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
module.exports = router;
