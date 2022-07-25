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
  deleteSection,
  getSection,
  updateSection,
} = require("../controllers/sectionController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/admin/section").post(createSection);
router.route("/admin/section/:id").delete(deleteSection);
router.route("/admin/section/:id").put(updateSection);

router.route("/section").get(getSections);
router.route("/section/:id").get(getSection);
router.route("/sections_categories").get(getSectionsCategories);

router.route("/section").put(isAuthenticatedUser, sendPaypalApiKey);

module.exports = router;
