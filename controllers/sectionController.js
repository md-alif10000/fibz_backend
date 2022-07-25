const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Section = require("../models/sectionModel");
const Category = require("../models/categoryModel");
const cloudinary = require("cloudinary");
const req = require("express/lib/request");
const res = require("express/lib/response");
const productModel = require("../models/productModel");

exports.createSection = catchAsyncErrors(async (req, res, next) => {
  const { name } = req.body;
  const result = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "sections",
  });

  const totalSections = await Section.find({}).countDocuments();
  console.log(totalSections);

  const section = new Section({
    name,
    serial: totalSections + 1,
    image: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });

  const _section = await section.save();

  res
    .status(201)
    .json({ success: true, message: "Successfullly Created section" });
});

exports.getSections = catchAsyncErrors(async (req, res, next) => {
  const secs = await Section.find();
  const cats = await Category.find();
  var sections = [];
  secs.forEach((section) => {
    const categories = cats.filter((cat) => cat.section == section._id);
    console.log(categories);
    section.categories = categories;
    sections.push(section);
  });

  res.status(200).json({ success: true, sections });
});

exports.getSection = catchAsyncErrors(async (req, res, next) => {
  const section = await Section.findById(req.params.id);
  const categories = await Category.find({ section: req.params.id });
  const products = await productModel.find({ section: req.params.id }).populate("category","_id name");

  res.status(200).json({
    success: true,
    section: { ...section._doc, products, categories },
  });
});
exports.getSectionsCategories = catchAsyncErrors(async (req, res, next) => {
  const sections = await Section.find();
  var sectionsCategories = [];

  console.log(sections);

  for (var section of sections) {
    const categories = await Category.find({ section: section._id });
    console.log("Categories", categories);
    section.categories = [];
    sectionsCategories.push(section);
  }

  res.status(200).json({ success: true, sectionsCategories });
});
exports.deleteSection = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  const section = await Section.findById(id);
  const categories = await Category.find({ section: id });
  if (categories) {
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].image.public_id) {
        const result = await cloudinary.v2.uploader.destroy(
          categories[i].image.public_id
        );
      }
      const _cat = await Category.findByIdAndDelete(categories[i]._id);
    }
  }
  if (section.image.public_id) {
    await cloudinary.v2.uploader.destroy(section.image.public_id);
  }

  const delsection = await Section.findByIdAndDelete(id);

  res.status(200).json({ success: true, message: "Successfully deleted" });
});


exports.updateSection = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  const section = await Section.findByIdAndUpdate(id,req.body,{new:true});
  



  res.status(200).json({ success: true, message: "Successfully Updated" });
});