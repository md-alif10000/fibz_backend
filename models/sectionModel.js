const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
    },
    serial: {
      type: Number,
      required: true,
    },

    image: {
      public_id: {
        type: String,
        // required: true,
      },
      url: {
        type: String,
        // required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Section", sectionSchema);
