const express = require("express");
const { isDriver, isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Drive = require("../model/drive");
const Order = require("../model/order");
const Charity = require("../model/charity");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");

// create drive
router.post(
  "/create-drive",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const charityId = req.body.charityId;
      const charity = await Charity.findById(charityId);
      if (!charity) {
        return next(new ErrorHandler("Charity Id is invalid!", 400));
      } else {
        const files = req.files;
        const imageUrls = files.map((file) => `${file.filename}`);

        const driveData = req.body;
        driveData.images = imageUrls;
        driveData.charity = charity;

        const drive = await Drive.create(driveData);

        res.status(201).json({
          success: true,
          drive,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all drives of a charity
router.get(
  "/get-all-drives-charity/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const drives = await Drive.find({ charityId: req.params.id });

      res.status(201).json({
        success: true,
        drives,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete drive of a charity
router.delete(
  "/delete-charity-drive/:id",
  isDriver,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const driveId = req.params.id;

      const driveData = await Drive.findById(driveId);

      driveData.images.forEach((imageUrl) => {
        const filename = imageUrl;
        const filePath = `uploads/${filename}`;

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });

      const drive = await Drive.findByIdAndDelete(driveId);

      if (!drive) {
        return next(new ErrorHandler("Drive not found with this id!", 500));
      }

      res.status(201).json({
        success: true,
        message: "Drive Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all drives
router.get(
  "/get-all-drives",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const drives = await Drive.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        drives,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// review for a drive
router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { donor, rating, comment, driveId, orderId } = req.body;

      const drive = await Drive.findById(driveId);

      const review = {
        donor,
        rating,
        comment,
        driveId,
      };

      const isReviewed = drive.reviews.find(
        (rev) => rev.donor._id === req.donor._id
      );

      if (isReviewed) {
        drive.reviews.forEach((rev) => {
          if (rev.donor._id === req.donor._id) {
            (rev.rating = rating), (rev.comment = comment), (rev.donor = donor);
          }
        });
      } else {
        drive.reviews.push(review);
      }

      let avg = 0;

      drive.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      drive.ratings = avg / drive.reviews.length;

      await drive.save({ validateBeforeSave: false });

      await Order.findByIdAndUpdate(
        orderId,
        { $set: { "cart.$[elem].isReviewed": true } },
        { arrayFilters: [{ "elem._id": driveId }], new: true }
      );

      res.status(200).json({
        success: true,
        message: "Reviwed succesfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// all drives --- for admin
router.get(
  "/admin-all-drives",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const drives = await Drive.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        drives,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;
