const express = require("express");
const router = express.Router();
const catchAsyncError = require("../middleware/catchAsyncError");
const Order = require("../model/order");
const { isAuthorized } = require("../middleware/auth");
const ErrorHandler = require("../utils/ErrorHandler");
const Product = "../model/product";

// create new Order

router.post(
  "/create-order",
  catchAsyncError(async (req, res, next) => {
    try {
        console.log("Welcome at order controller ");
        console.log("data from frontened is ",req.body);
      const { cart, shippingAddress, user, totalPrice, paymentInfo } =
        req.body;

      // groupCart items by shopId
      const shopItemMap = new Map();

      for (const item of cart) {
        console.log(item);
        const shopId = item.shop._id;
        // const shopId = item.shopeId;
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

module.exports = router;
