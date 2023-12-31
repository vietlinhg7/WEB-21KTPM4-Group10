const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');

router.get('/',controller.isLoggedIn, controller.showIndex);

router.get('/login', controller.showLogin);

router.post('/login', controller.login);
router.get('/logout', controller.logout);

router.post('/addQuan',controller.isLoggedIn, controller.addQuan);
router.get('/showQuan',controller.isLoggedIn, controller.showQuan);
router.post('/xoaQuan',controller.isLoggedIn, controller.xoaQuan);
module.exports = router;