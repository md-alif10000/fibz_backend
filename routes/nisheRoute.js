const express = require("express");

const {
  createNishe,
  deleteNishe,
  getNishes,
  getNishe,
  updateNishe,
} = require("../controllers/nisheController");

const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/admin/nishe").post(isAuthenticatedUser, createNishe);
router.route("/admin/nishe/:id").delete(isAuthenticatedUser, deleteNishe);
router.route("/admin/nishe/:id").put(isAuthenticatedUser, updateNishe);

router.route("/nishe").get(getNishes);
router.route("/nishe/:id").get(getNishe);

module.exports = router;
