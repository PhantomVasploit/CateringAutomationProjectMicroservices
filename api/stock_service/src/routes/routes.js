const express = require("express");
const router = express.Router();

const { seedDatabase, getIngredients} = require("../controller/ingredient.controller");
const { createStock, getStock, updateStock, deleteStock , getSpecificStock, getTodayStock} = require("../controller/stock.controller");
const { requireAuth } = require("../middleware/auth.middleware");

router.post("/seed", seedDatabase);
router.get("", getIngredients);
router.get("/today", getTodayStock);
router.post("/:ingredientId/:stockManagerId", requireAuth, createStock);
router.get("/:ingredient", getSpecificStock);
router.put("/:ingredientId", requireAuth, updateStock);
router.delete("/:ingredientId", requireAuth, deleteStock);

module.exports = router;
