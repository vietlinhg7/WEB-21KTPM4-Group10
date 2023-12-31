const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');

router.get('/',controller.isLoggedIn, controller.showIndex);

router.get('/login', controller.showLogin);

router.post('/login', controller.login);
router.get('/logout', controller.logout);

router.post('/addQuan',controller.isLoggedIn, controller.addQuan);
router.get('/showQuan',controller.isLoggedIn, controller.showQuan);
router.get('/xoaQuan',controller.isLoggedIn, controller.xoaQuan);
router.get('/chiTiet',controller.isLoggedIn, controller.chiTiet);
router.post('/themPhuong/:quanID',controller.isLoggedIn, controller.themPhuong);

module.exports = router;