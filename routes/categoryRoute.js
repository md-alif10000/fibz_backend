const express = require("express");
const {
  createCategory,
  getCategories,
  deleteCategory,
  getCategory,
} = require("../controllers/categoryController");

const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/admin/category").post(createCategory);
router.route("/admin/category/:id").delete(deleteCategory);

router.route("/category").get(getCategories);
router.route("/category/:id").get(getCategory);

module.exports = router;
