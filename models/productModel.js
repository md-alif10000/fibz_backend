const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter product Description"],
  },
  composition: {
    type: String,
  },
  sleeves: {
    type: String,
  },
  nishes1: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Nishe 1 is required"],
  },
  nishes2: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Nishe 2 is required"],
  },
  cutout: {
    type: String,
  },
  careInstructions: {
    type: String,
  },
  oldPrice: {
    type: Number,
    required: [true, "Please Enter product old Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  sizes: [
    {
      name: {
        type: String,
        required: true,
      },
      stock: {
        type: Number,
      },
    },
  ],
  colors: [
    {
      name: {
        type: String,
        required: true,
      },
      code: {
        type: String,
        required: true,
      },
    },
  ],
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section",
    required: [true, "Please Enter Product Section"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Please Enter Product Category"],
  },
  subCategory: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },
  Stock: {
    type: Number,
    required: [true, "Please Enter product Stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
