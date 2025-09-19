const express = require("express");
const Messages = require("../model/messages");
const ErrorHandler = require("../utils/ErrorHandler");
const router = express.Router();
const catchAsyncError = require("../middleware/catchAsyncError");
const { isSeller, isAuthorized } = require("../middleware/auth");
const { upload } = require("../multer");


router.post( 
  "/create-new-message",
  upload.array("images"),
  catchAsyncError(async (req, res, next) => {
    try {
      // console.log("req.body",req.body)
      const messageData = req.body;
       if (req.files) {
        const files = req.files;
        const imageUrls = files.map((file)=>`${file.fileName}`);
        messageData.files  = imageUrls
       }

      messageData.conversationId = req.body.conversationId;
      messageData.sender = req.body.sender;
      messageData.text = req.body.text;

      const message = new Messages({
        conversationId: messageData.conversationId,
        text: messageData.text,
        sender: messageData.sender,
        images: messageData.images ? messageData.images : undefined,
      });

      await message.save();

      res.status(201).json({
        success: true,
        message,
      });
      // console.log("goodbye at create message function")
    } catch (error) {
      return next(new ErrorHandler(error.message), 500);
    }
  })
);

// get all messages with conversation id
router.get(
  "/get-all-messages/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const messages = await Messages.find({
        conversationId: req.params.id,
      });

      res.status(201).json({
        success: true,
        messages,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message), 500);
    }
  })
);


module.exports = router;