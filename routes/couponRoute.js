const express = require("express");

const {
  createCoupon,
  deleteCoupon,
  getCoupons,
  updateCoupon,
  validateCoupon,
} = require("../controllers/couponController");

const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/admin/coupon").post(createCoupon);
router.route("/admin/coupon").get(getCoupons);
router.route("/admin/coupon/:id").delete(deleteCoupon);
router.route("/admin/coupon/:id").put(updateCoupon);

router.route("/coupon/validate").post(validateCoupon);

module.exports = router;
