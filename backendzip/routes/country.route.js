const express = require("express");
const router = express.Router();
const countryController = require("../controllers/country.controller");
const { checkAccess, verifyToken } = require("../helper/middleware");

router.get("/", countryController.getCountries);
router.get("/videos", countryController.getCountryVideos);
router.get(
  "/:id",
  verifyToken,
  checkAccess("country"),
  countryController.getCountryById
);
router.put("/:id", countryController.updateCountryById);

module.exports = router;
