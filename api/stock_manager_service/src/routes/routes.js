const express = require("express");
const router = express.Router();

const {register, login, updateAccount, deleteAccount, stockManagerDetails, stockManagerAccounts} = require("../controller/stockManager.controller");
const {requireAuth} = require("../middleware/auth.middleware");

router.post("/register", register);
router.post("/login", login);
router.get("/account/:stockManagerId", requireAuth, stockManagerDetails);
router.get("/accounts", requireAuth, stockManagerAccounts);
router.put("/account/:stockManagerId", requireAuth,updateAccount);
router.delete("/account/:stockManagerId", requireAuth, deleteAccount);

module.exports = router;
