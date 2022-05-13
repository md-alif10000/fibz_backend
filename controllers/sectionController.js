const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Section = require("../models/sectionModel");
const Category = require("../models/categoryModel");
const cloudinary = require("cloudinary");

exports.createSection = catchAsyncErrors(async (req, res, next) => {
  const { name } = req.body;
  console.log(req.body);
  // const result = await cloudinary.v2.uploader.upload(req.body.image, {
  //   folder: "sections",
  // });

  const totalSections = await Section.find({}).countDocuments();
  console.log(totalSections);

  const section = new Section({
    name,
    serial: totalSections + 1,
    // image: {
    //   public_id: result.public_id,
    //   url: result.secure_url,
    // },
  });

  const _section = await section.save();

  res
    .status(201)
    .json({ success: true, message: "Successfullly Created section" });
});

exports.getSections = catchAsyncErrors(async (req, res, next) => {
  const sections = await Section.find();

  res.status(200).json({ success: true, sections });
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
