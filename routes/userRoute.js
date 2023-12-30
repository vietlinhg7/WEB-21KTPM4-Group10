const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");

router.post('/reports', controller.addReport);

    
module.exports = router;