const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");

router.post('/reports', controller.addReport);

router.get('/billboards', controller.getBillboards);
router.get('/loais/:loaiID', controller.getLoais);
router.get('/locations/:locationID', controller.getLocations);




    
module.exports = router;