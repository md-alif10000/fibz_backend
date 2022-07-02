const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Category = require("../models/categoryModel");
const cloudinary = require("cloudinary");
const productModel = require("../models/productModel");

exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  const { name, section } = req.body;
  console.log(req.body);
  const result = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "categories",
  });

  const totalCategories = await Category.find({
    section: section,
  }).countDocuments();
  console.log(totalCategories);

  const category = new Category({
    name,
    serial: totalCategories + 1,
    section,
    image: {
      public_id: result.public_id,
      url: result.secure_url,
    },
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

exports.getCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  const products = await productModel.find({ category: req.params.id });

  res
    .status(200)
    .json({ success: true, category: { ...category._doc, products } });
});

exports.deleteCategory = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);
  if (category.image.public_id) {
    await cloudinary.v2.uploader.destroy(category.image.public_id);
  }

  const delsection = await Category.findByIdAndDelete(id);

  res.status(200).json({ success: true, message: "Successfully deleted" });
});
