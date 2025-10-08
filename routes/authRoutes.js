const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController.js");


router.post('/register', auth.register);
router.get('/login', auth.login);

export default router;