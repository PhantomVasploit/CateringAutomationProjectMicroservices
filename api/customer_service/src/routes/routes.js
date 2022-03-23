const express = require("express");
const router = express.Router();
const { register, login, customerAccountDetails, customerUpdate, customerDelete, customerAccounts } = require("../controller/customer.controller");
const {requireAuth} = require("../middleware/auth.middleware");

// registration router
router.post('/register', register);
router.post('/login', login);
router.get('/accounts', requireAuth, customerAccounts);
router.get('/account/:customerId', requireAuth, customerAccountDetails);
router.put('/account/:customerId', requireAuth, customerUpdate);
router.delete('/account/:customerId', requireAuth, customerDelete);
module.exports = router;
