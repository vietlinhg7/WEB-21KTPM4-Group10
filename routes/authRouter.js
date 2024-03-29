const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');

router.get('/',controller.isLoggedIn, controller.showIndex);

router.get('/login', controller.showLogin);
router.get('/logout', controller.logout);
router.get('/forgot', controller.showForgot);
router.get('/resend', controller.resend);
router.post('/login', controller.login);
router.post('/forgot', controller.forgot);
router.post('/verify', controller.verify);
router.post('/changePassword', controller.changePassword);

router.get('/changePass', controller.isLoggedIn, controller.showChangePass);
router.post('/changePass', controller.isLoggedIn, controller.changePass);
router.get('/profile', controller.isLoggedIn, controller.showProfile);
router.post('/addQuan',controller.isLoggedIn, controller.addQuan);
router.get('/showQuan',controller.isLoggedIn, controller.showQuan);
router.get('/xoaQuan',controller.isLoggedIn, controller.xoaQuan);
router.get('/chiTiet',controller.isLoggedIn, controller.chiTiet);
router.post('/themPhuong/:quanID',controller.isLoggedIn, controller.themPhuong);
router.get('/xoaPhuong/:phuongID/:quanID',controller.isLoggedIn, controller.xoaPhuong);
router.post('/suaPhuong/:phuongID/:quanID',controller.isLoggedIn, controller.suaPhuong);
router.post('/suaQuan/:quanID',controller.isLoggedIn, controller.suaQuan);
router.get('/showLoaiQC',controller.isLoggedIn, controller.showLoaiQC);
router.get('/xoaLoai/:loai',controller.isLoggedIn, controller.xoaLoai);
router.post('/suaLoai/:loai',controller.isLoggedIn, controller.suaLoai);

router.get('/locationInfo',controller.isLoggedIn, controller.showLocationInfo);
router.post('/themLoaiQC',controller.isLoggedIn, controller.themLoaiQC);
router.post('/locationInfo',controller.isLoggedIn, controller.saveLocation);

router.get('/billboardInfo',controller.isLoggedIn, controller.showBillboardInfo);
router.post('/billboardInfo',controller.isLoggedIn, controller.saveBillboard);

router.get('/reportInfo', controller.isLoggedIn, controller.showReportInfo);
router.post('/reportInfo', controller.isLoggedIn, controller.solveReport);

router.get('/taoCapPhep', controller.isLoggedIn, controller.taoCapPhep);
router.post('/taoCapPhep', controller.isLoggedIn, controller.luuCapPhep);

router.get('/Phuong-Map', controller.isLoggedIn, controller.showPhuongMap);
router.get('/Phuong-Map-Detail', controller.isLoggedIn, controller.showPhuongMapDetail);
router.get('/Phuong-DDQC', controller.isLoggedIn, controller.showPhuongDDQC);
router.get('/Phuong-BQC', controller.isLoggedIn, controller.showPhuongBQC);
router.get('/Phuong-BC', controller.isLoggedIn, controller.showPhuongBC);
router.post('/suaHinhThuc/:hinhthuc',controller.isLoggedIn, controller.suaHinhThuc);
router.get('/xoaHinhthuc/:hinhthuc',controller.isLoggedIn, controller.xoaHinhThuc);
router.post('/suaReportType/:name',controller.isLoggedIn, controller.suaReportType);
router.get('/xoaReportType/:name',controller.isLoggedIn, controller.xoaReportType);

router.get('/showLocation',controller.isLoggedIn, controller.showLocation);
router.post('/themHinhThucQC',controller.isLoggedIn, controller.themHinhThucQC);
router.post('/themHinhThucBC',controller.isLoggedIn, controller.themHinhThucBC);
router.get('/DDQCmap',controller.isLoggedIn, controller.DDQCmap);
router.get('/deleteLocation',controller.isLoggedIn, controller.deleteLocation);
router.get('/showEditLocation',controller.isLoggedIn, controller.showEditLocation);
router.get('/showRegister',controller.isLoggedIn,controller.showRegister);
router.get('/showTKBaoCao',controller.isLoggedIn, controller.showTKBC);
router.get('/showTKCXL',controller.isLoggedIn, controller.showTKCXL);
router.get('/XetDuyetChinhSua',controller.isLoggedIn, controller.xetDuyetChinhSua);
router.get('/YeuCauCapPhep',controller.isLoggedIn, controller.yeuCauCapPhep);
router.get('/DDQCdetail',controller.isLoggedIn, controller.DDQCdetail);
router.post('/addLocation',controller.isLoggedIn, controller.addLocation);
router.get('/infoReport', controller.getReports);
router.get('/BQCdetail',controller.isLoggedIn, controller.BQCdetail);
router.post('/addBQC',controller.isLoggedIn, controller.addBQC);
router.get('/showaddBQC',controller.isLoggedIn, controller.showaddBQC);

router.get('/deleteBQC',controller.isLoggedIn, controller.deleteBQC);

router.get('/DaPheDuyet',controller.isLoggedIn, controller.showDaPheDuyet);
router.get('/ChuaPheDuyet',controller.isLoggedIn, controller.showChuaPheDuyet);

router.post('/editLocation',controller.isLoggedIn, controller.editLocation);
router.post('/editBQC',controller.isLoggedIn, controller.editBQC);

router.get('/licenseInfo',controller.isLoggedIn, controller.showLicenseInfo);
router.get('/deleteLicense',controller.isLoggedIn, controller.deleteLicense);
router.post('/register',controller.isLoggedIn, controller.register);

module.exports = router;