const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Category Name"],
    },
    serial: {
      type: Number,
      required: true,
    },
    section: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Section",
    },

    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    subCategories:[
      {
        name:{
          type:String,
          required:true
          
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
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
