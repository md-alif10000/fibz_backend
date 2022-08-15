const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Coupon = require("../models/Coupon");

exports.createCoupon = catchAsyncErrors(async (req, res, next) => {
  const { code, value, minPurchase, maxpurchase, expiredate } = req.body;

  const coupon = await new Coupon({
    code: code.toUpperCase().replace(/\s+/g, ""),
    value,
    minPurchase,
    maxpurchase,
    expiredate,
  });

  await coupon.save();

  res
    .status(201)
    .json({ success: true, message: "Successfullly Created coupon" });
});

exports.getCategory = catchAsyncErrors(async (req, res, next) => {
  const coupon = await Coupon.findById(req.params.id);

  res.status(200).json({ success: true, coupon });
});

exports.getCoupons = catchAsyncErrors(async (req, res, next) => {
  const coupons = await Coupon.find();

  res.status(200).json({ success: true, coupons });
});

exports.deleteCoupon = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  const delsection = await Coupon.findByIdAndDelete(id);

  res.status(200).json({ success: true, message: "Successfully deleted" });
});

exports.updateCoupon = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  const delsection = await Coupon.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({ success: true, message: "Successfully Updated" });
});

exports.validateCoupon = catchAsyncErrors(async (req, res) => {
  const { code, purchase } = req.body;

  console.log("In coupon");

  const coupon = await Coupon.findOne({
    status: "active",
    code: code,
  });
  if (!coupon) {
    return res.status(400).json({
      success: false,
      message: `Invalid Coupon`,
    });
  }
  if (coupon.expiredate < Date.now()) {
    return res.status(400).json({
      success: true,
      message: `Coupon is expired`,
    });
  }
  if (coupon.minPurchase > purchase) {
    return res.status(400).json({
      success: true,
      message: `Minimum purchase ${coupon.minPurchase} EURO`,
    });
  } else {
    res.status(200).json({ success: true, message: "Coupon is valid", coupon });
  }
});
