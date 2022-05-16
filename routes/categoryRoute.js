const express = require("express");
const {
  createCategory,
  getCategories,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/category").post(createCategory);
router.route("/admin/category/:id").delete(deleteCategory);

router.route("/category").get(getCategories);

module.exports = router;
