const express = require("express");
const Shop = require("../model/shop");
const path = require("path");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const AsyncCatchError = require("../middleware/catchAsyncError");
const sendMail = require("../utils/sendMail");
const { sendShopToken } = require("../utils/sendShopToken.js");
const { isAuthorized, isSeller } = require("../middleware/auth");
const bcrypt = require("bcrypt");
const catchAsyncError = require("../middleware/catchAsyncError");

//create shop
router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  try {
    // console.log("welcome at create shop function");
    const { email } = req.body;
    const sellerEmail = await Shop.findOne({ email });
    if (sellerEmail) {
      const filename = req.file.filename;
      const filepath = `uploads/${filename}`;
      fs.unlink(filepath, (err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Error deleting file",
          });
        }
        return res.status(400).json({
          success: false,
          message: "ShopEmail  is already exist",
        });
      });
      return;
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    // console.log("hi");

    const seller = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      avatar: {
        url: fileUrl,
        public_id: filename,
      },
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
      address: req.body.address,
    };

    // console.log("welcome at middle of  create shop function");

    const activationToken = createActivationToken(seller);
    const activationUrl = `http://localhost:5173/activation/seller/${activationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: "Activate your Shop",
        message: `Hello ${seller.name} CLick on the link for activation your shop ${activationUrl}`,
      });
      res.status(200).json({
        success: true,
        message: `please check your email  to activate your shop`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

//activate seller

router.post(
  "/seller/activation",
  AsyncCatchError(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      if (!newUser) {
        return next(new ErrorHandler("Invalid Token", 400));
      }
      const { name, email, password, avatar, phoneNumber, address, zipCode } =
        newUser;

      const findseller = await Shop.findOne({ email });
      if (findseller) {
        return next(
          new ErrorHandler("your current  Seller is already exist ", 400)
        );
      }

      const seller = await Shop.create({
        name,
        password,
        email,
        avatar,
        phoneNumber,
        address,
        zipCode,
      });
      sendShopToken(seller, 201, res);
    } catch (error) {
      //   console.log("the error of the activation () is ", error.message);
      return next(new ErrorHandler(" Token is expired", 400));
    }
  })
);

// shop login
router.post(
  "/shop-login",
  AsyncCatchError(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email && !password) {
        return next(new ErrorHandler("Enter your email and password", 403));
      }

      const findShop = await Shop.findOne({ email }).select("+password");
      if (!findShop) {
        return next(new ErrorHandler("Shop is not exist in Database", 402));
      }

      const isValidPassowrd = await findShop.comparePassword(password);
      if (!isValidPassowrd) {
        return next(new ErrorHandler("Please provide valid information", 402));
      }

      sendShopToken(findShop, 200, res);
    } catch (error) {
      // console.log(error);
      return next(new ErrorHandler("Enter your valid email and password", 500));
    }
  })
);

//get user
router.get(
  "/getSeller",
  isSeller,
  AsyncCatchError(async (req, res, next) => {
    try {
      // console.log("Everything is okay in Authfunction and now is at get");

      const seller = await Shop.findById(req.user.id);
      //  console.log(seller)
      if (!seller) {
        return next(new ErrorHandler("Please login your shop", 500));
      }
      res.status(201).json({
        success: true,
        seller,
      });
      // console.log("Everything is okay in function at get");
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
      console.log(error);
    }
  })
);

// shop-user logout functionlaity

router.get(
  "/logout-seller",
  isSeller,
  AsyncCatchError(async (req, res, next) => {
    try {
      console.log("Welocme at logout function");
      res.cookie("seller_token", "", {
        expiresIn: new Date(Date.now),
        httpOnly: true,
      });
      res.status(200).json({
        message: "Logout sucessfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//update seller profile picture
router.put(
  "/update-seller-avatar",
  upload.single("image"),
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      console.log("welcome at update profile picture");
      const seller = await Shop.findById(req.user._id);
      if (!seller) {
        return next(
          new ErrorHandler("Seller is not found please login first", 400)
        );
      }

      const existAvatarPath = `uploads/${seller.avatar.url}`;
      fs.unlink(existAvatarPath, async (err) => {
        if (err) {
          return next(new ErrorHandler(err, 403));
        }
      });
      const newAvatar = {
        public_url: req.file.filename,
        url: req.file.filename,
      };

      seller.avatar = newAvatar;
      await seller.save({ validateBeforeSave: false });
      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//get shopInfo
router.get(
  "/get-shop-info/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const shopId = req.params.id;
      // console.log(shopId)
      const sellerInfo = await Shop.findById(shopId);
      // console.log(sellerInfo)
      res.status(200).json({
        success: true,
        sellerInfo,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// update shop

router.put(
  "/updateSellerInfo",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const { name, address, zipCode, phoneNumber, description } = req.body;
      const seller = await Shop.findOne(req.user._id);

      if (!seller) {
        return next(new ErrorHandler("Seller is not exist in database", 500));
      }

      seller.name = name;
      seller.address = address;
      seller.phoneNumber = phoneNumber;
      seller.zipCode = zipCode;
      seller.description = description;
      await seller.save({ validateBeforeSave: false });
      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
