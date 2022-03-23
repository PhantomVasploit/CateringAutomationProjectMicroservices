const express = require("express");
const router = express.Router();

const { seedDatabase, getFoodItems} = require("../controller/foodItem.controller");
const { createStock, getStock, updateStock, deleteStock , getSpecificStock} = require("../controller/stock.controller");
const { requireAuth } = require("../middleware/auth.middleware");

router.post("/seed", requireAuth, seedDatabase)
router.get("/foodItems", requireAuth, getFoodItems);
router.post("/:foodItemId/:stockManagerId", requireAuth, createStock);
router.get("/", requireAuth, getStock);
router.get("/:foodItemId", requireAuth, getSpecificStock);
router.put("/:stockId", requireAuth, updateStock);
router.delete("/:stockId", requireAuth, deleteStock);

module.exports = router;
