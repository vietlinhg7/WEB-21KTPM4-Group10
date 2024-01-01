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
router.get('/xoaPhuong/:phuongID/:quanID',controller.isLoggedIn, controller.xoaPhuong);
router.post('/suaPhuong/:phuongID/:quanID',controller.isLoggedIn, controller.suaPhuong);
router.post('/suaQuan/:quanID',controller.isLoggedIn, controller.suaQuan);
router.get('/showLoaiQC',controller.isLoggedIn, controller.showLoaiQC);
router.get('/xoaLoai/:loaiID/:loai',controller.isLoggedIn, controller.xoaLoai);
router.post('/suaLoai/:loaiID/:loai',controller.isLoggedIn, controller.suaLoai);

module.exports = router;