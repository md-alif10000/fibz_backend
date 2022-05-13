const express = require("express");
const {
  createCategory,
  getCategories,
} = require("../controllers/categoryController");

const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/category").post(createCategory);

router.route("/category").get(getCategories);

module.exports = router;
