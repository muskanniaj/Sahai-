const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const Donor = require("../model/donor");
const Charity = require("../model/charity");

exports.isAuthenticated = catchAsyncErrors(async(req,res,next) => {
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please login to continue", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.donor = await Donor.findById(decoded.id);

    next();
});


exports.isDriver = catchAsyncErrors(async(req,res,next) => {
    const {driver_token} = req.cookies;
    if(!driver_token){
        return next(new ErrorHandler("Please login to continue", 401));
    }

    const decoded = jwt.verify(driver_token, process.env.JWT_SECRET_KEY);

    req.driver = await Charity.findById(decoded.id);

    next();
});


exports.isAdmin = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.donor.role)){
            return next(new ErrorHandler(`${req.donor.role} can not access this resources!`))
        };
        next();
    }
}