const express = require("express");
const multer = require('multer');
const router = express.Router();
const storage= require("../CloudImage/index");
const controller = require("../controllers/userController");

const upload = multer({ storage: storage });


router.post('/reports', controller.addReport);
router.post('/boardID', controller.handleBoardIDPost)

router.get('/billboards/:locationID', controller.getBillboards);
router.get('/locations', controller.getLocations);

router.post('/upload', upload.array('images'), controller.getImage);



    
module.exports = router;