const express = require("express");
const router = express.Router();
const controller = require("../controllers/vaccineController");

router.post("/", controller.createVaccine);
router.get("/", controller.getAllVaccine);
router.get("/:id", controller.getVaccineById);
router.patch("/:id", controller.updateVaccinated)

module.exports = router