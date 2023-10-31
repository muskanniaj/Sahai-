const express = require("express");
const path = require("path");
const Donor = require("../model/donor");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

router.post("/create-donor", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const donorEmail = await Donor.findOne({ email });

    if (donorEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        }
      });
      return next(new ErrorHandler("Donor already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const donor = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };

    const activationToken = createActivationToken(donor);

    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    try {
      await sendMail({
        email: donor.email,
        subject: "Activate your account",
        message: `Hello ${donor.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${donor.email} to activate your account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// create activation token
const createActivationToken = (donor) => {
  return jwt.sign(donor, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate donor
router.post("/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newDonor = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newDonor) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar } = newDonor;

      let donor = await Donor.findOne({ email });

      if (donor) {
        return next(new ErrorHandler("Donor already exists", 400));
      }
      donor = await Donor.create({
        name,
        email,
        password,
        avatar,
      });

      sendToken(donor, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// login donor
router.post(
  "/login-donor",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }

      const donor = await Donor.findOne({ email }).select("+password");

      if (!donor) {
        return next(new ErrorHandler("Donor doesn't exists!", 400));
      }

      const isPasswordValid = await donor.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      sendToken(donor, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load donor
router.get(
  "/getdonor",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const donor = await Donor.findById(req.donor.id);

      if (!donor) {
        return next(new ErrorHandler("Donor doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        donor,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// log out donor
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", null, {
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

// update donor info
router.put(
  "/update-donor-info",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password, phoneNumber, name } = req.body;

      const donor = await Donor.findOne({ email }).select("+password");

      if (!donor) {
        return next(new ErrorHandler("Donor not found", 400));
      }

      const isPasswordValid = await donor.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      donor.name = name;
      donor.email = email;
      donor.phoneNumber = phoneNumber;

      await donor.save();

      res.status(201).json({
        success: true,
        donor,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update donor avatar
router.put(
  "/update-avatar",
  isAuthenticated,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const existsDonor = await Donor.findById(req.donor.id);

      const existAvatarPath = `uploads/${existsDonor.avatar}`;

      fs.unlinkSync(existAvatarPath);

      const fileUrl = path.join(req.file.filename);

      const donor = await Donor.findByIdAndUpdate(req.donor.id, {
        avatar: fileUrl,
      });

      res.status(200).json({
        success: true,
        donor,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update donor addresses
router.put(
  "/update-donor-addresses",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const donor = await Donor.findById(req.donor.id);

      const sameTypeAddress = donor.addresses.find(
        (address) => address.addressType === req.body.addressType
      );
      if (sameTypeAddress) {
        return next(
          new ErrorHandler(`${req.body.addressType} address already exists`)
        );
      }

      const existsAddress = donor.addresses.find(
        (address) => address._id === req.body._id
      );

      if (existsAddress) {
        Object.assign(existsAddress, req.body);
      } else {
        // add the new address to the array
        donor.addresses.push(req.body);
      }

      await donor.save();

      res.status(200).json({
        success: true,
        donor,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete donor address
router.delete(
  "/delete-donor-address/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const donorId = req.donor._id;
      const addressId = req.params.id;

      console.log(addressId);

      await Donor.updateOne(
        {
          _id: donorId,
        },
        { $pull: { addresses: { _id: addressId } } }
      );

      const donor = await Donor.findById(donorId);

      res.status(200).json({ success: true, donor });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update donor password
router.put(
  "/update-donor-password",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const donor = await Donor.findById(req.donor.id).select("+password");

      const isPasswordMatched = await donor.comparePassword(
        req.body.oldPassword
      );

      if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect!", 400));
      }

      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(
          new ErrorHandler("Password doesn't matched with each other!", 400)
        );
      }
      donor.password = req.body.newPassword;

      await donor.save();

      res.status(200).json({
        success: true,
        message: "Password updated successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// find donor infoormation with the donorId
router.get(
  "/donor-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const donor = await Donor.findById(req.params.id);

      res.status(201).json({
        success: true,
        donor,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all donors --- for admin
router.get(
  "/admin-all-donors",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const donors = await Donor.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        donors,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete donors --- admin
router.delete(
  "/delete-donor/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const donor = await Donor.findById(req.params.id);

      if (!donor) {
        return next(
          new ErrorHandler("Donor is not available with this id", 400)
        );
      }

      await Donor.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: "Donor deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
