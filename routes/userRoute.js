const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");

router.post('/reports', controller.addReport);
router.post('/boardID', controller.handleBoardIDPost)

router.get('/billboards/:locationID', controller.getBillboards);
router.get('/locations', controller.getLocations);




    
module.exports = router;