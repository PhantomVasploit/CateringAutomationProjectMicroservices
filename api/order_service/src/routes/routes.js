const express = require("express");
const router = express.Router();

const
{
  createOrder,
  customerCreateOrder,
  getCustomerOrders,
  processPayment,
  getOrders,
  mpesaConfirmationURL
 }
   = require("../controller/order.controller");
const { requireAuth } = require("../middleware/auth.middleware");


router.post("/:cashierId/:e_menuId", requireAuth, createOrder);
router.post("/customer/:customerId/:e_menuId", customerCreateOrder);
router.get("/customer/orders/:customerId", requireAuth, getCustomerOrders);
router.post("/api/v1/c2b/confirmation", mpesaConfirmationURL);
router.get("", requireAuth, getOrders);
router.post("/processpayment", requireAuth,  processPayment);
module.exports = router
