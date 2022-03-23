const express = require("express");
const router = express.Router();

const
{
  createOrder,
  customerCreateOrder,
  getCustomerOrders,
  processPayment,
  getOrders
 }
   = require("../controller/order.controller");
const { requireAuth } = require("../middleware/auth.middleware");


router.post("/:cashierId/:e_menuId", requireAuth, createOrder);
router.post("/customer/:customerId/:e_menuId", customerCreateOrder);
router.get("/customer/orders/:customerId", requireAuth, getCustomerOrders);
router.get("", requireAuth, getOrders);
router.post("/processpayment", requireAuth,  processPayment);
module.exports = router
