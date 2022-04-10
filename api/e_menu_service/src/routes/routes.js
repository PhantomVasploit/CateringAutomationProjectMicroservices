const express = require("express");
const router = express.Router()

const { seedDatabase, getFoodItems } = require("../controller/foodItem.controller.js");
const { createEMenu, getMenu } = require("../controller/e_menu.controller");
const { requireAuth } = require("../middleware/auth.middleware");

router.post("/seed", requireAuth, seedDatabase);
router.get("/foodItems", requireAuth, getFoodItems);
router.post("/:foodItemId/:chefId", requireAuth, createEMenu);
router.get("/menu", getMenu);

module.exports = router;
