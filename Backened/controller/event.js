const express = require("express");
const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const router = express.Router();
const Event = require("../model/event");
const catchAsyncError = require("../middleware/catchAsyncError");
const { upload } = require("../multer");
const { isSeller } = require("../middleware/auth");
//create  an event
router.post(
  "/create-event",
  upload.array("images"),
  catchAsyncError(async (req, res, next) => {
    try {
      console.log("welocme at create event function");
      const shopeIdObj = req.body;
      const shopeId = shopeIdObj.shopeId;
      // console.log(shopeId)
      const shop = await Shop.findById(shopeId);
      if (!shop) {
        return next(new ErrorHandler("Shop is Invalid", 400));
      } else {
        const files = req.files;
        const imageUrls = files.map((file) => `${file.filename}`);
        const eventData = req.body;
        // console.log("product data is ",productData);
        eventData.images = imageUrls;
        eventData.shop = shop;
        //  console.log("product data is ",productData);
        // const cleanProductData = JSON.parse(JSON.stringify(productData));
        // console.log(cleanProductData);
        // const product = await Product.create(cleanProductData);
        const event = await Event.create(eventData);
        console.log("event  is correcly created ", event);
        res.status(201).json({
          success: true,
          event,
        });
      }
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error, 400));
    }
  })
);

//get all events
router.get(
  "/get-all-events-shop/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const shopeId = req.params.id
      // console.log(shopId);
      const events = await Event.find({shopeId});
        // console.log(events);
      res.json({
        success: true,
        events,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error, 400));
    }
  })
);

//delete an event

router.delete(
  "/delete-shop-event/:id",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const eventId = req.params.id;
      const eventData = await Event.find({ eventId });
     console.log(eventData)
      if (!eventData) {
        return next(new ErrorHandler("Event is not find", 400));
      }
       console.log("everything is okay at delete the event") 
      // const event = await Event.findByIdAndDelete({ eventId });


      // res.json({
      //   success: true,
      //   message: "Deleted Event successfully",
      // });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
module.exports = router;
