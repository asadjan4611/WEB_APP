const express = require("express");
const User = require("../model/user");
const path = require("path");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const AsyncCatchError = require("../middleware/catchAsyncError");
const sendMail = require("../utils/sendMail");
const { sendToken } = require("../utils/sendToken");
const { isAuthorized } = require("../middleware/auth");
const catchAsyncError = require("../middleware/catchAsyncError");
router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userEmail = await User.findOne({ email });
    if (userEmail) {
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
          message: "Users is already exist",
        });
      });
      return;
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: {
        url: fileUrl,
        public_id: filename,
      },
    };
    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:5173/activation/${activationToken}`;
    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name} CLick on the link for activation your account ${activationUrl}`,
      });
      res.status(200).json({
        success: true,
        message: `please check your email  to activate your account`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    console.log(error.message);
    return next(new ErrorHandler(error.message, 400));
  }
});

//create activation token

const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

//activate user

router.post(
  "/activation",
  AsyncCatchError(async (req, res, next) => {
    try {
      console.log("Welocome at activatin function");
      const { activation_token } = req.body;
      // console.log("activation_token is",activation_token);
      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      if (!newUser) {
        return next(new ErrorHandler("Invalid Token", 400));
      }
      // console.log(newUser);
      // const { name, email, password, avatar } = newUser;
      const user = await User.create(newUser);

      // console.log("send token is correctly working");
      sendToken(user, 201, res);
    } catch (error) {
      console.log("the error of the activation () is ", error.message);
      return next(new ErrorHandler(" Token is expired", 400));
    }
  })
);
//login user
router.post(
  "/login-user",
  AsyncCatchError(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email && !password) {
        return next(new ErrorHandler("Enter your email and password", 403));
      }

      const findUser = await User.findOne({ email }).select("+password");
      if (!findUser) {
        return next(new ErrorHandler("User is not exist in Database", 402));
      }

      const isValidPassowrd = await findUser.comparePassword(password);
      if (!isValidPassowrd) {
        return next(new ErrorHandler("Please provide valid information", 402));
      }

      sendToken(findUser, 200, res);
    } catch (error) {
      // console.log(error);
      return next(new ErrorHandler("Enter your email and password", 500));
    }
  })
);
//get user
router.get(
  "/getUser",
  isAuthorized,
  AsyncCatchError(async (req, res, next) => {
    try {
      // console.log("Everything is okay in function at get");

      const user = await User.findById(req.user.id);
      // console.log(user)
      if (!user) {
        return next(new ErrorHandler("Enter your email and password", 500));
      }
      res.status(201).json({
        success: true,
        user,
      });
      // console.log("Everything is okay in function at get");
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
      console.log(error);
    }
  })
);

//logout Route

router.get(
  "/logout",
  isAuthorized,
  AsyncCatchError(async (req, res, next) => {
    try {
      console.log("welcome at logout function");
      res.cookie("token", "", {
        expiresIn: new Date(Date.now),
        httpOnly: true,
      });

      res.status(200).json({
        success: true,
        message: "LogOut Sucessfully",
      });

      console.log("Bye from logout function");
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//update user info

router.put(
  "/updateUserInfo",
  isAuthorized,
  catchAsyncError(async (req, res, next) => {
    try {
      const { email, password, phoneNumber, name } = req.body;
      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("user is not exist in database", 500));
      }

      const isPassowrdValid = await user.comparePassword(password);

      if (!isPassowrdValid) {
        return next(new ErrorHandler("Password is not correct", 500));
      }

      user.name = name;
      user.email = email;
      user.phoneNumber = phoneNumber;

      await user.save();
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//update user image

router.put(
  "/update-user-avatar",
  isAuthorized,
  upload.single("image"),
  AsyncCatchError(async (req, res, next) => {
    try {
      const existUser = await User.findById(req.user.id);
      if (!existUser) {
        return next(new ErrorHandler("User is not found", 400));
      }

      const existAvatarPath = `uploads/${existUser.avatar.url}`;
      fs.unlink(existAvatarPath, async (err) => {
        if (err) {
          return next(new ErrorHandler(err, 400));
        }
      });
      const newAvatar = {
        public_url: req.file.filename,
        url: req.file.filename,
      };
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { avatar: newAvatar },
        { new: true }
      );

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//update address

router.put(
  "/userAddressUpadte",
  isAuthorized,
  catchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);
      // checking address type  is  checking
      const sameTypeAddress = user.addresses.find(
        (address) => address.addressType === req.body.addressType
      );
      if (sameTypeAddress) {
        return next(
          new ErrorHandler(`${req.body.addressType} address already exist`)
        );
      }
      // add the address in array
      user.addresses.push(req.body);

      await user.save({ validateModifiedOnly: true });
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error, 400));
    }
  })
);

//delete address of a user

router.delete(
  "/delete-address/:id",
  isAuthorized,
  catchAsyncError(async (req, res, next) => {
    const userId = req.user.id;
    const addressId = req.params.id;
    await User.updateOne(
      {
        _id: userId,
      },
      { $pull: { addresses: { _id: addressId } } }
    );
    const user = await User.findById(userId);
    res.status(200).json({
      success: true,
      user,
    });
  })
);

// update user  password

router.put(
  "/updatePassword",
  isAuthorized,
  catchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select("+password");
      const passswordMatched = await user.comparePassword(req.body.oldPassword);
      if (!passswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));
      }

      if (req.body.newPassword !== req.body.confPassword) {
        return next(
          new ErrorHandler("Password does not match each Other", 500)
        );
      }

      user.password = req.body.newPassword;
      await user.save({ validateModifiedOnly: true });
      res.status(200).json({
        success: true,
        message: "Password updated successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 500));
    }
  })
);
module.exports = router;
