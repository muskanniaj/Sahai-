const mongoose = require("mongoose");

const driveSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your drive name!"],
  },
  description: {
    type: String,
    required: [true, "Please enter your drive description!"],
  },
  category: {
    type: String,
    required: [true, "Please enter your drive category!"],
  },
  tags: {
    type: String,
  },
  originalPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
    required: [true, "PPlease enter your drive price!"],
  },
  stock: {
    type: Number,
    required: [false, "Please enter your drive stock!"],
  },
  images: [
    {
      type: String,
    },
  ],
  reviews: [
    {
      donor: {
        type: Object,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
      driveId: {
        type: String,
      },
      createdAt:{
        type: Date,
        default: Date.now(),
      }
    },
  ],
  ratings: {
    type: Number,
  },
  charityId: {
    type: String,
    required: true,
  },
  charity: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Drive", driveSchema);
