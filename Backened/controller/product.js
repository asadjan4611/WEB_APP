const express = require("express");
const Product = require("../model/product.js");
const router = express.Router();
const AsyncCatchError = require("../middleware/catchAsyncError");
const Shop = require("../model/shop");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const  path = require("path");
//create  a product
router.post(
  "/create-product",
  upload.array("images"),
  AsyncCatchError(async (req, res, next) => {
    try {
        // console.log("Product is:", Product);

      console.log("welocme at create product function");
      const shopeIdObj = req.body;
      const shopeId = shopeIdObj.shopeId;
      const shop = await Shop.findById(shopeId);
      // console.log(shop._id)
      if (!shop) {
        return next(new ErrorHandler("Shop is Invalid", 400));
      } else {
        const files = req.files;
        const imageUrls = files.map((file) => `${file.filename}`);
        const productData = req.body;
        // console.log("product data is ",productData);
        productData.images = imageUrls;
        productData.shop = shop;
        //  console.log("product data is ",productData);
        // const cleanProductData = JSON.parse(JSON.stringify(productData));
        // console.log(cleanProductData);
        // const product = await Product.create(cleanProductData);
        const product = await Product.create(productData);
        console.log("product is correcly created ", product);
        res.status(201).json({
          success: true,
          product,
        });
      }
    } catch (error) {
        console.log(error)
      return next(new ErrorHandler(error, 400));
    }
  })
);


//get all products
 router.get("/get-all-products-shop/:id",AsyncCatchError(async(req,res,next)=>{
     try {
       const shopeId = req.params.id;
       const products=  await Product.find({shopeId});
       
       res.json({
        success :true,
        products
       });

     } catch (error) {
        return next(new ErrorHandler(error,400))
     }
 }));
 
 
 // delete an products
 
 router.delete("/delete-shop-product/:id",AsyncCatchError (async(req,res,next)=>{
   try {
        console.log("welocome at function of deleting the product");
        const productId = req.params.id;
        console.log(productId)
        const productData = await Product.findById(productId);
        console.log(productData);
  
        productData.images.forEach((imageUrl) => {
         
          const filepath=path.join( process.cwd(),"uploads",imageUrl);
          console.log(filepath);
          fs.unlink(filepath,(err)=>{
          if (err) {
              console.log(err)
          } else {
             console.log("Product deleted sucessfully",filepath) 
          }
          }
        );
          
        });
        console.log("everything is okay")

        if (!productData) {
          return next( new ErrorHandler("product is not exist",400));  
        }
        const product = await Product.findByIdAndDelete(productId);
        res.status(200).json({
            success :true,
            "message":"Delete the product sucessfully"
         });
        } catch (error) {
          return next( new ErrorHandler(error,400));  
    }
  }));


//get all products of all shops
  router.get("/get-all-products",AsyncCatchError(async(req,res,next)=>{
     try {
      //  const shopeId = req.params.id;
       const products=  await Product.find();
       
       res.json({
        success :true,
        products
       });

     } catch (error) {
        return next(new ErrorHandler(error,400))
     }
 }));

  
  module.exports = router;