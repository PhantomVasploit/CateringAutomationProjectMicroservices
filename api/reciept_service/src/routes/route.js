const express = require("express");
const router = express.Router();

const { seedDatabase } = require("../controller/foodItem.controller");
const {generateReciept, getReciept} = require("../controller/reciept.controller");
const {requireAuth} = require("../middleware/auth.middleware");

router.post("/seed", requireAuth, seedDatabase);
router.get("/reciept", requireAuth, getReciept);
router.post("/reciept", requireAuth, generateReciept);

module.exports = router;
