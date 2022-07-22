const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Setting = require("../models/Setting");

exports.createSetting = catchAsyncErrors(async (req, res, next) => {
  const setting = new Setting(req.body);

  setting.save();

  res.status(201).json({
    success: true,
    setting: setting,
  });
});

exports.getSetting = catchAsyncErrors(async (req, res, next) => {
  const _setting = await Setting.find();
  const setting = _setting[0];

  res.status(200).json({
    success: true,
    setting: setting,
  });
});

exports.updateSetting = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params.id;
  const setting = await Setting.findByIdAndUpdate(id, req.body, { new: true });

  res.status(201).json({
    success: true,
    setting: setting,
  });
});
