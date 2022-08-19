const mongoose = require("mongoose");

const nisheSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter nishe Code"],
      maxLength: [30, "Name cannot exceed 30 characters"],
    },

    slug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Nishe", nisheSchema);
