const express = require("express");
const {
  processStripePayment,
  sendStripeApiKey,
  sendPaypalApiKey,
} = require("../controllers/paymentController");
const {
  createSetting,
  getSetting,
} = require("../controllers/settingController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/setting").post( createSetting);

router.route("/setting").get(getSetting);

router.route("/paypalapikey").get(isAuthenticatedUser, sendPaypalApiKey);

module.exports = router;
