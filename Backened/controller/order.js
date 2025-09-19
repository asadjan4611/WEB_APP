const express = require("express");
const router = express.Router();
const catchAsyncError = require("../middleware/catchAsyncError");
const Order = require("../model/order");
const { isAuthorized, isSeller } = require("../middleware/auth");
const ErrorHandler = require("../utils/ErrorHandler");
const Product = require("../model/product");
const Shop = require("../model/shop");


// create new Order

router.post(
  "/create-order",
  catchAsyncError(async (req, res, next) => {
    try {
      const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;
      const shopItemMap = new Map();

      for (const item of cart) {
        const shopId = item.shop._id;
        if (!shopItemMap.has(shopId)) {
          shopItemMap.set(shopId, []);
        }
        shopItemMap.get(shopId).push(item);
      }

      // create an order for each shop

      const orders = [];
      for (const [shopeId, items] of shopItemMap) {
        const order = await Order.create({
          cart: items,
          shippingAddress,
          user,
          totalPrice,
          paymentInfo,
        });
        orders.push(order);
      }
      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all orders of a user

router.get(
  "/getOrders/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const userId = req.params.id;
      const orders = await Order.find({ "user._id": userId });
      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get orders of a specific shop

router.get(
  "/getShopOrders/:shopId",
  catchAsyncError(async (req, res, next) => {
    try {
      const shopId = req.params.shopId;
      const orders = await Order.find({
        cart: { $elemMatch: { shopeId: `${shopId}` } },
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//update order status for seller

router.put(
  "/update-order-status/:id",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      console.log("welocome at function");
      const id = req.params.id;
      const order = await Order.findById(id);

      if (!order) {
        return next(new ErrorHandler("Order not found  for this id", 400));
      }
      if (req.body.status === "Transferred to delivery partner") {
        order.cart.forEach(async (o) => {
          await updateProduct(o._id, o.count);
        });
      }

      order.status = req.body.status;
      if ((req.body.status = "Delivered")) {
        order.deliveredAt = Date.now();
        order.paymentInfo.status = "succeded";
        const serviceCharge = order.totalPrice * .10;
        await updateSellerInfo(order.totalPrice - serviceCharge);
      }

      await order.save({ validateBeforeSave: false });
      res.status(200).json({
        success: true,
        order,
      });
      async function updateProduct(id, count) {
        const product = await Product.findById(id);
        product.stock -= count;
        product.sold_out += count;

        await product.save({ validateBeforeSave: false });
      }

      async function updateSellerInfo(amount) {
        const seller = await Shop.findById(req.user.id);
        
        seller.availableBalance = amount;

        await seller.save();
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// order refund processing

router.put(
  "/refund-order/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      console.log("welocome at function");
      const id = req.params.id;
      const order = await Order.findById(id);
      if (!order) {
        return next(new ErrorHandler("Order not found  for this id", 400));
      }

      order.status = req.body.status;

      await order.save({ validateBeforeSave: false });
      res.status(200).json({
        success: true,
        message: "Refund in Processing",
        order,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//accept the refund.....for user

router.put(
  "/order-refund-success/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      console.log("welocome at function");
      const id = req.params.id;
      const order = await Order.findById(id);
      if (!order) {
        return next(new ErrorHandler("Order not found  for this id", 400));
      }

      order.status = req.body.status;
      if (req.body.status === "Refund Success") {
        order.cart.forEach(async (o) => {
          console.log(o);
          await updateProduct(o._id, o.count);
        });
      }
      
        async function updateProduct(id, count) {
        const product = await Product.findById(id);
        product.stock += count;
        product.sold_out -= count;

        await product.save({ validateBeforeSave: false });
        console.log("everything is okay");
      }
      await order.save({ validateBeforeSave: false });
      res.status(200).json({
        success: true,
        message: "Order refund successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);


module.exports = router;
