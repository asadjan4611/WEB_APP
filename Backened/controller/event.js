const express = require("express");
const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const router = express.Router();
const Event = require("../model/event");
const catchAsyncError = require("../middleware/catchAsyncError");
const { upload } = require("../multer");
const { isSeller } = require("../middleware/auth");
const path = require("path");
const fs = require("fs");
const cloudinary = require("../cloudinary.js");

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
      }
      let imageUrls = [];
      for (let i = 0; i < req.files.length; i++) {
        const result =await  new Promise((resolve, reject) => {
          cloudinary.v2.uploader
            .upload_stream({ folder: "events" }, (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            })
            .end(req.files[i].buffer);
        });
        imageUrls.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }

      const eventData = req.body;
      eventData.images = imageUrls;
      eventData.shop = shop;
      const event = await Event.create(eventData);
      res.status(201).json({
        success: true,
        event,
      });
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
      const shopeId = req.params.id;
      // console.log(shopId);
      const events = await Event.find({ shopeId });
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
  // isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      console.log("welocme at delete function");
      const eventId = req.params.id;
      // console.log(eventId)
      const eventData = await Event.findById(eventId);

      eventData.images.forEach(async(image) => {
           await cloudinary.uploader.destroy(image.public_id)
      });
       console.log(eventData)
      if (!eventData) {
        return next(new ErrorHandler("Event is not find", 400));
      }
      console.log("everything is okay at delete the event");
      // const event = await Event.findByIdAndDelete({ eventId });

      const event = await Event.findByIdAndDelete(eventId);

      res.json({
        success: true,
        message: "Deleted Event successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//get all events of all shops

router.get(
  "/get-all-events-shop",
  catchAsyncError(async (req, res, next) => {
    try {
      // const shopeId = req.params.id;
      // // console.log(shopId);
      const events = await Event.find();
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

module.exports = router;
