const express = require("express");
const {
  createCategory,
  getCategories,
  deleteCategory,
  getCategory,
  addSubCategory,
  deleteSubCategory,
} = require("../controllers/categoryController");

const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/admin/category").post(createCategory);
router.route("/admin/category/:id").delete(deleteCategory);
router.route("/admin/sub_category").post(addSubCategory);
router.route("/admin/sub_category/:id").delete(deleteSubCategory);

router.route("/category").get(getCategories);
router.route("/category/:id").get(getCategory);

module.exports = router;
