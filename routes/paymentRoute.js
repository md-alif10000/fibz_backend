const express = require("express");
const {
  processStripePayment,
  sendStripeApiKey,
  sendPaypalApiKey
} = require("../controllers/paymentController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/payment/stripe_process").post(isAuthenticatedUser, processStripePayment);

router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);


router.route("/paypalapikey").get(isAuthenticatedUser,sendPaypalApiKey)

module.exports = router;
