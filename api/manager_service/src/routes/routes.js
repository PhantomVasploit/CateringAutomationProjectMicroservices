const express = require("express");
const router = express.Router();

const {register, login, managerAccountDetails, managerAccounts, updateAccount, deleteAccount} = require("../controller/manager.controller");
const {requireAuth} = require("../middleware/auth.middleware");

router.post("/register", register);
router.post("/login" , login);
router.get("/account/:managerId", requireAuth, managerAccountDetails);
router.get("/accounts", requireAuth, managerAccounts);
router.put("/account/:managerId", requireAuth, updateAccount);
router.delete("/account/:managerId", requireAuth, deleteAccount);

module.exports = router;
