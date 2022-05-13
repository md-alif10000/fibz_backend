const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Category = require("../models/categoryModel");
const cloudinary = require("cloudinary");

exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  const { name, section } = req.body;
  console.log(req.body);
  // const result = await cloudinary.v2.uploader.upload(req.body.image, {
  //   folder: "sections",
  // });

  const totalCategories = await Category.find({
    section: section,
  }).countDocuments();
  console.log(totalCategories);

  const category = new Category({
    name,
    serial: totalCategories + 1,
    section,
    // image: {
    //   public_id: result.public_id,
    //   url: result.secure_url,
    // },
  });

  const _section = await category.save();

  res
    .status(201)
    .json({ success: true, message: "Successfullly Created category" });
});

exports.getCategories = catchAsyncErrors(async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json({ success: true, categories });
});
