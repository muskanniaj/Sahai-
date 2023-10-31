const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const Charity = require("../model/charity");
const { isAuthenticated, isDriver, isAdmin } = require("../middleware/auth");
const { upload } = require("../multer");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const sendCharityToken = require("../utils/charityToken");

// create charity
router.post("/create-charity", upload.single("file"), async (req, res, next) => {
  try {
    const { email } = req.body;
    const driverEmail = await Charity.findOne({ email });
    if (driverEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        }
      });
      return next(new ErrorHandler("Charity already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const driver = {
      name: req.body.name,
      email: email,
      password: req.body.password,
      avatar: fileUrl,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
    };

    const activationToken = createActivationToken(driver);

    const activationUrl = `http://localhost:3000/driver/activation/${activationToken}`;

    try {
      await sendMail({
        email: driver.email,
        subject: "Activate your Charity",
        message: `Hello ${driver.name}, please click on the link to activate your charity: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${driver.email} to activate your charity!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// create activation token
const createActivationToken = (driver) => {
  return jwt.sign(driver, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate user
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newDriver = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newDriver) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar, zipCode, address, phoneNumber } =
        newDriver;

      let driver = await Charity.findOne({ email });

      if (driver) {
        return next(new ErrorHandler("Charity already exists", 400));
      }

      driver = await Charity.create({
        name,
        email,
        avatar,
        password,
        zipCode,
        address,
        phoneNumber,
      });

      sendCharityToken(driver, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// login charity
router.post(
  "/login-charity",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const user = await Charity.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("Charity doesn't exists!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      sendCharityToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load charity
router.get(
  "/getDriver",
  isDriver,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const driver = await Charity.findById(req.driver._id);

      if (!driver) {
        return next(new ErrorHandler("Charity doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        driver,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// log out from charity
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("driver_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get charity info
router.get(
  "/get-charity-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const charity = await Charity.findById(req.params.id);
      res.status(201).json({
        success: true,
        charity,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update charity profile picture
router.put(
  "/update-charity-avatar",
  isDriver,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const existsCharity = await Charity.findById(req.driver._id);

      const existAvatarPath = `uploads/${existsCharity.avatar}`;

      fs.unlinkSync(existAvatarPath);

      const fileUrl = path.join(req.file.filename);

      const driver = await Charity.findByIdAndUpdate(req.driver._id, {
        avatar: fileUrl,
      });

      res.status(200).json({
        success: true,
        driver,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update driver info
router.put(
  "/update-driver-info",
  isDriver,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, description, address, phoneNumber, zipCode } = req.body;

      const charity = await Charity.findOne(req.driver._id);

      if (!charity) {
        return next(new ErrorHandler("Charity not found", 400));
      }

      charity.name = name;
      charity.description = description;
      charity.address = address;
      charity.phoneNumber = phoneNumber;
      charity.zipCode = zipCode;

      await charity.save();

      res.status(201).json({
        success: true,
        charity,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all drivers --- for admin
router.get(
  "/admin-all-drivers",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const drivers = await Charity.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        drivers,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete driver ---admin
router.delete(
  "/delete-driver/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const driver = await Charity.findById(req.params.id);

      if (!driver) {
        return next(
          new ErrorHandler("Driver is not available with this id", 400)
        );
      }

      await Charity.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: "Driver deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update driver withdraw methods --- drivers
router.put(
  "/update-payment-methods",
  isDriver,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { withdrawMethod } = req.body;

      const driver = await Charity.findByIdAndUpdate(req.driver._id, {
        withdrawMethod,
      });

      res.status(201).json({
        success: true,
        driver,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete driver withdraw merthods --- only driver
router.delete(
  "/delete-withdraw-method/",
  isDriver,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const driver = await Charity.findById(req.driver._id);

      if (!driver) {
        return next(new ErrorHandler("Driver not found with this id", 400));
      }

      driver.withdrawMethod = null;

      await driver.save();

      res.status(201).json({
        success: true,
        driver,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
