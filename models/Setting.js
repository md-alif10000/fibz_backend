const mongoose = require("mongoose");
const validator = require("validator");

const settingSchema = new mongoose.Schema(
  {
    nationalCharge: {
      type: Number,
      required: [true, "Please Enter National Shipping Charge"],
      default: 0,
    },
    interNationalCharge: {
      type: Number,
      required: [true, "Please Enter Inter-National Shipping Charge"],
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Setting", settingSchema);
