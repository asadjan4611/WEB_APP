const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECERAT_KEY);
const catchAsyncError = require("../middleware/catchAsyncError");

router.post(
  "/process",
  catchAsyncError(async (req, res, next) => {
    console.log("Welocome at Payment Controller")
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "USD",
      metadata: {
        company: "Star Solution",
      },
    });

    res.status(200).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  })
);

router.get(
  "/stripeApiKey",
  catchAsyncError(async (req, res, next) => {
    console.log("object");
    res.status(200).json({ stripeApiKey: process.env.STRIPE_APi_KEY });
  })
);
module.exports = router;
