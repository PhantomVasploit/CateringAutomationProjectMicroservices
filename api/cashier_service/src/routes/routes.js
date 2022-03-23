const express = require("express");
const router = express.Router();

const { register, login, cashierAccountDetails , updateAccount, deleteAccount, cashierAccounts} = require("../controller/cashier.controller");
const {requireAuth} = require("../middleware/auth.middleware");

router.post("/register", register);
router.post("/login", login);
router.get("/accounts", requireAuth, cashierAccounts);
router.get("/account/:cashierId", requireAuth ,cashierAccountDetails);
router.put("/account/:cashierId", requireAuth, updateAccount);
router.delete("/account/:cashierId", requireAuth, deleteAccount);

module.exports = router
