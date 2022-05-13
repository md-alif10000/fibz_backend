const express = require("express");
const {
  processStripePayment,
  sendStripeApiKey,
  sendPaypalApiKey,
} = require("../controllers/paymentController");
const {
  createSection,
  getSections,
  getSectionsCategories,
} = require("../controllers/sectionController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/section").post(createSection);

router.route("/section").get(getSections);
router.route("/sections_categories").get(getSectionsCategories);

router.route("/section").put(isAuthenticatedUser, sendPaypalApiKey);

module.exports = router;
