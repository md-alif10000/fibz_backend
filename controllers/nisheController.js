const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Nishe = require("../models/Nishe");
const slugify = require("slugify");

exports.createNishe = catchAsyncErrors(async (req, res, next) => {
  const { name } = req.body;

  //   const result = await cloudinary.v2.uploader.upload(req.body.image, {
  //     folder: "categories",
  //   });

  const nishe = await new Nishe({
    name,
    slug: slugify(name),
  });

  const _nishe = await nishe.save();

  res
    .status(201)
    .json({ success: true, message: "Successfullly Created Nishe" });
});

exports.getNishes = catchAsyncErrors(async (req, res, next) => {
  const nishes = await Nishe.find();

  res.status(200).json({ success: true, nishes });
});

exports.getNishe = catchAsyncErrors(async (req, res, next) => {
  const nishe = await Nishe.findById(req.params.id);

  res.status(200).json({ success: true, nishe });
});

exports.deleteNishe = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  const delsection = await Nishe.findByIdAndDelete(id);

  res.status(200).json({ success: true, message: "Successfully deleted" });
});

exports.updateNishe = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  const delsection = await Nishe.findByIdAndUpdate(id, req.body, { new: true });

  res.status(200).json({ success: true, message: "Successfully deleted" });
});
