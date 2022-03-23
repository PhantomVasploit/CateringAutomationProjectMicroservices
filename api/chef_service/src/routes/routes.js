const express = require("express");
const router = express.Router();

const {register, login, chefAccountDetails, chefAccounts, updateAccount, deleteAccount} = require("../controller/chef.controller");
const {requireAuth} = require("../middleware/auth.middleware");

router.post("/register", register);
router.post("/login", login);
router.get("/account/:chefId", requireAuth, chefAccountDetails);
router.get("/accounts", requireAuth, chefAccounts);
router.put("/account/:chefId", requireAuth, updateAccount);
router.delete("/account/:chefId", requireAuth, deleteAccount);

module.exports = router;
