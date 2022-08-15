const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Please Enter Coupon Code"],
      maxLength: [30, "Name cannot exceed 30 characters"],
    },

    value: {
      type: Number,
      required: true,
    },
    minPurchase: {
      type: Number,
      required: true,
    },
    maxPurchase: {
      type: Number,
      required: true,
      default: 100000000,
    },
    expiredate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
