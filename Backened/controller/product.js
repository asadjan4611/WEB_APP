const express = require("express");
const Product = require("../model/product.js");
const router = express.Router();
const AsyncCatchError = require("../middleware/catchAsyncError");
const Shop = require("../model/shop");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const path = require("path");
const catchAsyncError = require("../middleware/catchAsyncError");
const { isAuthorized } = require("../middleware/auth.js");
const Order = require("../model/order");
const cloudinary = require("../cloudinary.js")
//create  a product
router.post(
  "/create-product",
  upload.array("images"),
  AsyncCatchError(async (req, res, next) => {
    try {
      const shopeIdObj = req.body;
      const shopeId = shopeIdObj.shopeId;
      const shop = await Shop.findById(shopeId);
      if (!shop) {
        return next(new ErrorHandler("Shop is Invalid", 400));
      } 
         let imageUrls = [];

      // Loop through files and upload to cloudinary
      for (let i = 0; i < req.files.length; i++) {
        const result = await new Promise((resolve, reject) => {
          cloudinary.v2.uploader.upload_stream(
            { folder: "products" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          ).end(req.files[i].buffer); // send buffer here
        });

        imageUrls.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }

        const productData = req.body;
        productData.images = imageUrls;
        productData.shop = shop;
        const product = await Product.create(productData);
        res.status(201).json({
          success: true,
          product,
        });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error, 400));
    }
  })
);

//get all products
router.get(
  "/get-all-products-shop/:id",
  AsyncCatchError(async (req, res, next) => {
    try {
      const shopeId = req.params.id;
      const products = await Product.find({ shopeId: shopeId });
      res.json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete an products

router.delete(
  "/delete-shop-product/:id",
  AsyncCatchError(async (req, res, next) => {
    try {
      console.log("welocome at function of deleting the product");
      const productId = req.params.id;
      // console.log(productId)
      const productData = await Product.findById(productId);
    
      // console.log("everything is okay")

      if (!productData) {
        return next(new ErrorHandler("product is not exist", 400));
      }
       productData.images.forEach(async(image) => {
                 await cloudinary.uploader.destroy(image.public_id)
            });

      const product = await Product.findByIdAndDelete(productId);
      res.status(200).json({
        success: true,
        message: "Delete the product sucessfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//get all products of all shops
router.get(
  "/get-all-products",
  AsyncCatchError(async (req, res, next) => {
    try {
      //  const shopeId = req.params.id;
      const products = await Product.find();

      res.json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//review for a product

router.put(
  "/create-new-review",
  isAuthorized,
  catchAsyncError(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;
      const product = await Product.findById(productId);
      const review = { user, rating, comment, productId };
      const isReviewed = product.reviews.find((rev) => {
        rev.user._id === req.user._id;
      });
      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user._id === req.user._id) {
            (rev.user = user), (rev.rating = rating), (rev.comment = comment);
          }
        });
      } else {
        product.reviews.push(review);
      }

      let avg = 0;

      if (product.reviews.length > 0) {
        avg =
          product.reviews.reduce((acc, rev) => acc + rev.rating, 0) /
          product.reviews.length;
      }
      product.rating = avg;
      await product.save({ validateBeforeSave: false });

      await Order.findByIdAndUpdate(
        orderId,
        { $set: { "cart.$[elem].isReviewed": true } },
        { arrayFilters: [{ "elem._id": productId }], new: true }
      );

      res.status(200).json({
        success: true,
        message: "reviewed Successfully",
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
