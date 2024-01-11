const controller = {};
const mongoose = require('mongoose');
const User = require('../models/user');
const Location = require('../models/location');
const Billboard = require('../models/billboard');
const Quan = require('../models/quan');
const Phuong = require('../models/phuong');
const Loai = require('../models/loai');
const Hinhthuc = require('../models/hinhthuc');
const ReportType = require('../models/reportType');
const Loaivitri = require('../models/loaivitri');
const Report = require('../models/report');
const Request = require('../models/request');
const Capphep = require('../models/capphep')
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const { notify } = require('../routes/authRouter');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ndvlinh21@clc.fitus.edu.vn',
        pass: 'gkil ziel tfsx rldr'
    }
});

controller.deleteLicense = async (req,res) => {
    await Capphep.deleteOne({licenseID: req.query.keyword});
    res.redirect('/ChuaPheDuyet');
}
controller.showLicenseInfo = async (req,res) => {
    capphep = await Capphep.findOne({licenseID: req.query.keyword}).lean();
    let date = new Date(capphep.ngaybatdau);
    let day = ("0" + date.getDate()).slice(-2); // Get the day of the month (from 1 to 31)
    let month = ("0" + (date.getMonth() + 1)).slice(-2); // Get the month (from 0 to 11)
    let year = date.getFullYear(); // Get the full year
    capphep.ngaybatdau = `${year}-${month}-${day}`; // Combine the day, month, and year into a string
    date = new Date(capphep.ngayketthuc);
    day = ("0" + date.getDate()).slice(-2); // Get the day of the month (from 1 to 31)
    month = ("0" + (date.getMonth() + 1)).slice(-2); // Get the month (from 0 to 11)
    year = date.getFullYear(); // Get the full year
    capphep.ngayketthuc= `${year}-${month}-${day}`; // Combine the day, month, and year into a string
    res.locals.capphep = capphep;
    res.render('Phuong-XemCapPhep', {
        layout: 'Phuong',
    });

}
controller.showDaPheDuyet = async (req,res) => {
    cappheps = await Capphep.find({tinhtrang: 'Đã xét duyệt'}).lean();
    for (capphep of cappheps) {
        let date = new Date(capphep.ngaybatdau);
        let day = ("0" + date.getDate()).slice(-2); // Get the day of the month (from 1 to 31)
        let month = ("0" + (date.getMonth() + 1)).slice(-2); // Get the month (from 0 to 11)
        let year = date.getFullYear(); // Get the full year
        capphep.ngaybatdau = `${year}-${month}-${day}`; // Combine the day, month, and year into a string
        date = new Date(capphep.ngayketthuc);
        day = ("0" + date.getDate()).slice(-2); // Get the day of the month (from 1 to 31)
        month = ("0" + (date.getMonth() + 1)).slice(-2); // Get the month (from 0 to 11)
        year = date.getFullYear(); // Get the full year
        capphep.ngayketthuc= `${year}-${month}-${day}`; // Combine the day, month, and year into a string
        let location = await Location.findOne({locationID: capphep.locationID});
        capphep.location = location.name;
        let billboard = await Billboard.findOne({billboardID: capphep.billboardID});
        capphep.billboard = billboard.loai;
    }
    res.locals.cappheps = cappheps;
    res.render('Phuong-DaCapPhep', {
        layout: 'Phuong',
    });
}

controller.showChuaPheDuyet = async (req,res) => {
    cappheps = await Capphep.find({tinhtrang: 'Chưa xét duyệt'}).lean();
    for (capphep of cappheps) {
        let date = new Date(capphep.ngaybatdau);
        let day = ("0" + date.getDate()).slice(-2); // Get the day of the month (from 1 to 31)
        let month = ("0" + (date.getMonth() + 1)).slice(-2); // Get the month (from 0 to 11)
        let year = date.getFullYear(); // Get the full year
        capphep.ngaybatdau = `${year}-${month}-${day}`; // Combine the day, month, and year into a string
        date = new Date(capphep.ngayketthuc);
        day = ("0" + date.getDate()).slice(-2); // Get the day of the month (from 1 to 31)
        month = ("0" + (date.getMonth() + 1)).slice(-2); // Get the month (from 0 to 11)
        year = date.getFullYear(); // Get the full year
        capphep.ngayketthuc= `${year}-${month}-${day}`; // Combine the day, month, and year into a string
        let location = await Location.findOne({locationID: capphep.locationID});
        capphep.location = location.name;
        let billboard = await Billboard.findOne({billboardID: capphep.billboardID});
        capphep.billboard = billboard.loai;
    }
    res.locals.cappheps = cappheps;
    res.render('Phuong-ChuaCapPhep', {
        layout: 'Phuong',
    });
}

controller.taoCapPhep = async (req, res) => {
    billboardID = req.query.keyword;
    billboard = await Billboard.findOne({ billboardID });
    res.locals.billboardID = billboardID;
    res.locals.locationID = billboard.locationID;
    if (await Capphep.findOne({billboardID}))
    {
        capphep = await Capphep.findOne({billboardID}).lean();
        let date = new Date(capphep.ngaybatdau);
        let day = ("0" + date.getDate()).slice(-2); // Get the day of the month (from 1 to 31)
        let month = ("0" + (date.getMonth() + 1)).slice(-2); // Get the month (from 0 to 11)
        let year = date.getFullYear(); // Get the full year
        capphep.ngaybatdau = `${year}-${month}-${day}`; // Combine the day, month, and year into a string
        date = new Date(capphep.ngayketthuc);
        day = ("0" + date.getDate()).slice(-2); // Get the day of the month (from 1 to 31)
        month = ("0" + (date.getMonth() + 1)).slice(-2); // Get the month (from 0 to 11)
        year = date.getFullYear(); // Get the full year
        capphep.ngayketthuc= `${year}-${month}-${day}`; // Combine the day, month, and year into a string
        res.locals.capphep = capphep;
    }
    else {
        res.locals.capphep = new Capphep({ });
    }
    res.render('Phuong-CapPhep', {
        layout: 'Phuong',
    });
}

controller.luuCapPhep = async (req, res) => {
    let licenseID = '0';
    while (await Capphep.findOne({ licenseID })) {
        licenseID = (parseInt(licenseID) + 1).toString();
    }
    let locationID = req.body.locationID;
    let billboardID = req.body.billboardID;
    console.log(req.body);
    const capphep = new Capphep({
        licenseID: licenseID,
        locationID: locationID,
        billboardID: billboardID,
        noidung: req.body.noidung,
        hinhAnh: req.body.hinhAnh,
        congty: req.body.congty,
        email: req.body.email,
        dienthoai: req.body.dienthoai,
        diachi: req.body.diachi,
        ngaybatdau: new Date(req.body.ngaybatdau),
        ngayketthuc: new Date(req.body.ngayhethan),
        tinhtrang: 'Chưa xét duyệt'
    });
    await capphep.save();
    res.redirect('/Phuong-BQC?keyword='+req.body.locationID);
}

controller.saveLocation = async (req, res) => {
    locationID = req.query.keyword;
    let requestID = '0';
    while (await Request.findOne({ requestID })) {
        requestID = (parseInt(requestID) + 1).toString();
    }
    const thongtinmoi = new Location({
        locationID: locationID,
        name: req.body.ten,
        diachi: req.body.diachi,
        phuongID: req.body.phuong,
        quanID: req.body.quan,
        loaivitri: req.body.loaivitri,
        hinhanh: req.body.hinhanh,
        hinhthuc: req.body.hinhthuc,
        quyhoach: req.body.quyhoach,
        toadoX: req.body.toadoX,
        toadoY: req.body.toadoY
    });
    const newRequest = new Request({
        requestID: requestID,
        thongtinmoi: thongtinmoi,
        lydo: req.body.lydo,
        queryID: locationID,
        tinhtrang: "Chưa xử lý"
    });
    await newRequest.save();
    res.redirect('/Phuong-BQC?keyword='+req.body.locationID);
}
controller.saveBillboard = async(req, res) => {
    billboardID = req.query.keyword;
    let requestID = '0';
    while (await Request.findOne({ requestID })) {
        requestID = (parseInt(requestID) + 1).toString();
    }
    const thongtinmoi = new Billboard({
        billboardID: billboardID,
        kichthuoc: req.body.kichthuoc,
        hinhthuc: req.body.hinhthuc,
        hinhanh: req.body.hinhanh,
        ngayhethan: new Date(req.body.ngayhethan),
        locationID: req.body.locationID,
        loai: req.body.loai,
        soluong: req.body.soluong
    });
    const newRequest = new Request({
        requestID: requestID,
        thongtinmoi: thongtinmoi,
        lydo: req.body.lydo,
        queryID: billboardID,
        tinhtrang: "Chưa xử lý"
    });
    await newRequest.save();
    res.redirect('/Phuong-BQC?keyword='+req.body.locationID);
}

controller.solveReport = async(req, res) => {
    reportID = req.query.keyword;
    await Report.updateOne({ reportID: reportID }, {
        tinhtrang: "Đã xử lí",
        cachthucxuly: req.body.xuly,
    });
    report =  await Report.findOne({ reportID }).lean();
    let date = new Date(report.thoidiemgui);
    let day = ("0" + date.getDate()).slice(-2); // Get the day of the month (from 1 to 31)
    let month = ("0" + (date.getMonth() + 1)).slice(-2); // Get the month (from 0 to 11)
    let year = date.getFullYear(); // Get the full year
    report.thoidiemgui = `${day}-${month}-${year}`; // Combine the day, month, and year into a string
    console.log(report.email);
    let mailOptions = {
        from: 'ndvlinh21@clc.fitus.edu.vn',
        to: report.email,
        subject: 'Cách thức xử lý cho báo cáo của bạn',
        text: `
        Gửi ${report.fullName},

        Chúng tôi đã nhận được báo cáo của bạn về việc ${report.reportType} vào ngày ${report.thoidiemgui}

        Mail này nhằm thông báo rằng báo cáo của bạn đã được xử lý bởi cán bộ phường phụ trách phường ${req.session.user.phuongID} thuộc quận ${req.session.user.quanID}

        Hãy xử lý vấn đề của bạn theo cách thức được đề xuất sau đây:

        ${report.cachthucxuly}

        Chúc vấn đề của bạn sớm được giải quyết

        Trân trọng,
        Nhóm 10`
    };
    try {
        transporter.sendMail(mailOptions);
        res.redirect('/Phuong-BC');
    } catch (err) {
        console.log('error');
        res.redirect('/Phuong-BC');
    }
    
}

controller.showLocationInfo = async(req, res) => {
    locationID = req.query.keyword;
    res.locals.location = await Location.findOne({ locationID });
    let loaivitri = await Loaivitri.find({});
    let hinhThuc = await Hinhthuc.find({});
    res.render('Phuong-DDQC-Info', {
        layout: 'Phuong',
        loaivitri: loaivitri,
        hinhThuc: hinhThuc
    })
}
controller.showBillboardInfo = async(req, res) => {
    billboardID = req.query.keyword;
    billboard = await Billboard.findOne({ billboardID }).lean();
    let date = new Date(billboard.ngayhethan);
    let day = ("0" + date.getDate()).slice(-2); // Get the day of the month (from 1 to 31)
    let month = ("0" + (date.getMonth() + 1)).slice(-2); // Get the month (from 0 to 11)
    let year = date.getFullYear(); // Get the full year
    billboard.ngayhethan = `${year}-${month}-${day}`; // Combine the day, month, and year into a string
    res.locals.billboard = billboard;
    let loai = await Loai.find({});
    let hinhThuc = await Hinhthuc.find({});
    res.render('Phuong-BQC-Info', {
        layout: 'Phuong', 
        loai: loai,
        hinhThuc: hinhThuc
    })
}

controller.showReportInfo = async(req, res) => {
    reportID = req.query.keyword;
    report = await Report.findOne({ reportID }).lean();
    let date = new Date(report.thoidiemgui);
    let day = ("0" + date.getDate()).slice(-2); // Get the day of the month (from 1 to 31)
    let month = ("0" + (date.getMonth() + 1)).slice(-2); // Get the month (from 0 to 11)
    let year = date.getFullYear(); // Get the full year
    report.thoidiemgui = `${day}-${month}-${year}`; // Combine the day, month, and year into a string
    res.locals.report = report;
    res.render('Phuong-BC-Info', {
        layout: 'Phuong'
    })
}


controller.showPhuongBQC = async(req, res) => {
    let billboards = await Billboard.find({
        locationID: req.query.keyword
    }).lean();
    for (let billboard of billboards) {
        if (await Capphep.findOne({billboardID: billboard.billboardID, tinhtrang: "Đã xét duyệt"}))
        {
            billboard.tinhtrangcapphep = "Đã cấp phép";
        } else if (await Capphep.findOne({billboardID: billboard.billboardID,})) {
            billboard.tinhtrangcapphep = "Đã tạo chưa cấp phép";
        }
        else {
            billboard.tinhtrangcapphep = "Chưa cấp phép";
        }
    }
    res.locals.billboards = billboards;
    res.render('Phuong-BQC', {
        layout: 'Phuong'
    });

};

controller.showPhuongBC = async(req, res) => {
    let locations = await Location.find({
        phuongID: req.session.user.phuong,
        quanID: req.session.user.quan
    });
    let reports = [];
    for (location of locations) {
        let locationReports = await Report.find({
            queryID: location.locationID,
            tinhtrang: "Chưa xử lí"
         }).lean();
         
        billboards = await Billboard.find({
            locationID: location.locationID
         }).lean();
         
         let combinedReports = [];
         for (let billboard of billboards) {
            let billboardReports = await Report.find({
                queryID: billboard.billboardID,
                tinhtrang: "Chưa xử lí"
            }).lean();
     
            // Combine reports
            combinedReports = combinedReports.concat(locationReports, billboardReports);
         };
         reports = reports.concat(combinedReports);
     };
    for (let report of reports) {
        let date = new Date(report.thoidiemgui);
        let day = ("0" + date.getDate()).slice(-2); // Get the day of the month (from 1 to 31)
        let month = ("0" + (date.getMonth() + 1)).slice(-2); // Get the month (from 0 to 11)
        let year = date.getFullYear(); // Get the full year
        report.thoidiemgui = `${day}-${month}-${year}`; // Combine the day, month, and year into a string
    }
    res.locals.reports=reports;
    res.render('Phuong-BC', {
        layout: 'Phuong'
    });

};

controller.showPhuongDDQC = async (req, res) => {
    let locations = await Location.find({
        phuongID: req.session.user.phuong,
        quanID: req.session.user.quan
    });
    res.locals.location = locations;
    res.render('Phuong-DDQC', {
        layout: 'Phuong'
    });

};

controller.showChangePass = async (req, res) => {
    res.render('changePass', {
        layout: req.session.user.chucvu
    });
};

controller.changePass = async (req, res) => {
    let { curpassword, newpassword, verify } = req.body;
    if (await bcrypt.compare(curpassword, req.session.user.password) && newpassword === verify) {
        let user = await User.findOne({ userID: req.session.user.userID });
        if (user) {
            let salt = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash(newpassword, salt);
            user.password = hashedPassword;
            await user.save();
            req.session.user = await User.findOne({ userID: req.session.user.userID });
            res.render('changePass', {
                layout: req.session.user.chucvu,
                message: 'Thay đổi mật khẩu thành công'
            });
        }
    }
    else res.render('changePass', {
        layout: req.session.user.chucvu,
        message: 'Mật khẩu cũ nhập sai hoặc mật khẩu mới nhập không khớp'
    });
};

controller.showEditLocation = async (req, res) => {
    const keyword = req.query.keyword;
    let location = await Location.findOne({ locationID: keyword });
    let quan = await Quan.find({});
    let phuong = await Phuong.find({});
    let loaivitri = await Loaivitri.find({});
    let hinhThuc = await Hinhthuc.find({});
    console.log(keyword);
    try {
        res.render('So-DDQC-edit', {
            layout: 'So',
            location: location,
            quan: quan,
            phuong: phuong,
            loaivitri: loaivitri,
            hinhThuc: hinhThuc
        });
        // or wherever you want to redirect after saving
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}
controller.editLocation = async (req, res) => {
    const keyword = req.query.keyword;
    const lat = req.body.lat;
    const lng = req.body.lng;
    const htqc = req.body.HTQC;
    const QHCQH = req.body.QHCQH;
    const lvt = req.body.LVT;
    const qid = req.body.QIDD;
    const pid = req.body.PIDD;
    const address = req.body.address;
    const addressdetail = req.body.address_detail;
    const imgurl = req.body.imgurl;
    // console.log(lat, lng, htqc, QHCQH, lvt, qid, pid, address, addressdetail);


    //console.log(num.length);
    const num = await Location.find({ quanID: qid, phuongID: pid });
    const lid = pid + qid + '_' + num.length;
    await Billboard.updateMany({ locationID: keyword }, { locationID: lid });
    await Location.updateOne({ locationID: keyword }, {
        locationID: lid,
        name: address,
        diachi: addressdetail,
        phuongID: pid,
        quanID: qid,
        loaivitri: lvt,
        hinhanh: imgurl,
        hinhthuc: htqc,
        quyhoach: QHCQH,
        toadoX: lat,
        toadoY: lng,
    });
    try {
        res.redirect('/showLocation'); // or wherever you want to redirect after saving
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}


controller.deleteLocation = async (req, res) => {
    try {
        const keyword = req.query.keyword;
        await Location.deleteOne({ locationID: keyword });
        res.redirect('/showLocation');
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

controller.showForgot = (req, res) => {
    res.render('Forgot', {
        layout: false
    });
}

controller.forgot = async (req, res) => {
    let { email } = req.body;
    let user = await User.findOne({ email });
    if (user) {
        let otp = Math.floor(100000 + Math.random() * 900000); // generates a six digit OTP

        let mailOptions = {
            from: 'ndvlinh21@clc.fitus.edu.vn',
            to: email,
            subject: 'OTP for Password Change',
            text: `
            Dear ${user.hoTen},

            We received a request to secure your account. As a security measure, we're asking you to enter a one-time password (OTP) to verify your identity.

            Your OTP for this operation is: ${otp}

            Please enter this OTP in the provided field to proceed with changing your password. Remember, this OTP is confidential. Do not share it with anyone to avoid unauthorized access to your account.

            If you did not initiate this process, please contact our support team immediately.

            Best Regards,
            Group 10`
        };

        transporter.sendMail(mailOptions);
        req.session.email = email;
        req.session.otp = otp;
        res.render('verify', {
            layout: false,
        })
    } else {
        res.render('forgot', {
            layout: false,
            message: 'No account exists with this email.'
        });
    }
}

controller.resend = async (req, res) => {
    // Assuming the user is stored in req.session.user
    let email = req.session.email;
    let user = await User.findOne({ email });
    if (!user) {
        return res.status(401).send('Unauthorized');
    }

    let otp = Math.floor(100000 + Math.random() * 900000); // generates a six digit OTP

    let mailOptions = {
        from: 'your-email@gmail.com',
        to: user.email,
        subject: 'OTP for Password Change',
        text: `
      Dear ${user.hoTen},
   
      We received a request to secure your account. As a security measure, we're asking you to enter a one-time password (OTP) to verify your identity.
   
      Your OTP for this operation is: ${otp}
   
      Please enter this OTP in the provided field to proceed with changing your password. Remember, this OTP is confidential. Do not share it with anyone to avoid unauthorized access to your account.
   
      If you did not initiate this process, please contact our support team immediately.
   
      Best Regards,
      Group 10`
    };

    transporter.sendMail(mailOptions);
    req.session.email = email;
    req.session.otp = otp;
    res.render('verify', {
        layout: false,
    });
};

controller.verify = async (req, res) => {
    let { otp } = req.body;
    if (req.session.otp == otp) {
        res.render('changePassword', {
            layout: false,
        })
    }
    else res.render('verify', {
        layout: false,
    });
};

controller.changePassword = async (req, res) => {
    let { password, verify } = req.body;
    if (password === verify) {
        let email = req.session.email;
        let user = await User.findOne({ email });
        if (user) {
            let salt = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
            await user.save();
            res.render('login', {
                layout: false,
                message: 'Password changed successfully'
            });
        } else {
            res.render('changePassword', {
                layout: false,
                message: 'No user found with this email'
            });
        }
    }
    else res.render('changePassword', {
        layout: false,
        message: 'Passwords do not match'
    });
};

controller.showProfile = (req, res) => {
    res.render('Profile', {
        layout: false
    });
};

controller.DDQCmap = async (req, res) => {
    const keyword = req.query.keyword;

    let quan = await Quan.find({});
    let phuong = await Phuong.find({ quanID: keyword });
    let loaivitri = await Loaivitri.find({});
    let hinhThuc = await Hinhthuc.find({});
    res.render('So-DDQC-map', {
        layout: 'So',
        quan: quan,
        phuong: phuong,
        loaivitri: loaivitri,
        hinhThuc: hinhThuc,

    });

}
controller.showLocation = async (req, res) => {
    
    
    // let location = await Location.find({});
    // res.render('So-DDQC', {
    //     layout: 'So',
    //     location: location
    // });

    let location = await Location.find({});
    res.render('So-DDQC', {
        layout: 'So',
        location: location
    });
}
controller.themHinhThucQC = async (req, res) => {

    const ten = req.body.tenHinhThuc;
    const htid = req.body.HTID;

    const newHinhthuc = new Hinhthuc({ hinhthuc: ten, hinhthucID: htid });
    try {
        await newHinhthuc.save();
        res.redirect('/showLoaiQC'); // or wherever you want to redirect after saving
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
controller.xoaHinhThuc = async (req, res) => {
    try {
        const ht = req.params.hinhthuc;
        await Hinhthuc.deleteOne({ hinhthuc: ht });
        res.redirect('/showLoaiQC');
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

controller.suaHinhThuc = async (req, res) => {
    const ht = req.params.hinhthuc;

    const newHT = req.body.HT;
    await Hinhthuc.updateOne({ hinhthuc: ht }, { hinhthuc: newHT })
    try {

        res.redirect('/showLoaiQC');

        // or wherever you want to redirect after saving
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

controller.themLoaiQC = async (req, res) => {
    const lid = req.body.LID;
    const ten = req.body.tenLoai;
    const newLoai = new Loai({ loai: ten, loaiID: lid });
    try {
        await newLoai.save();
        res.redirect('/showLoaiQC'); // or wherever you want to redirect after saving
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

controller.xoaLoai = async (req, res) => {
    try {
        const loai = req.params.loai;
        await Loai.deleteOne({ loai: loai });
        res.redirect('/showLoaiQC');
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

controller.suaLoai = async (req, res) => {
    const loai = req.params.loai;

    const newLid = req.body.LID;
    await Loai.updateOne({ loai: loai }, { loai: newLid })
    try {

        res.redirect('/showLoaiQC');

        // or wherever you want to redirect after saving
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}


controller.showLoaiQC = async (req, res) => {
    let loai = await Loai.find({});
    let hinhThuc = await Hinhthuc.find({});
    let reportType = await ReportType.find({});
    let loaivitri = await Loaivitri.find({});
    res.render('So-LoaiHinhQC', {
        layout: 'So',
        loai: loai,
        hinhThuc: hinhThuc,
        reportType: reportType,
        loaivitri: loaivitri
    });
}

controller.suaQuan = async (req, res) => {
    const qid = req.params.quanID;
    const newQid = req.body.QID;
    let temp = await Quan.findOne({ quanID: newQid });
    if (temp != null) {
        res.send('<script>alert("QuanID is defined"); window.location="/chiTiet?keyword=' + qid + '";</script>');
    }
    else {

        await Phuong.updateMany({ quanID: qid }, { quanID: newQid });
        await Quan.updateOne({ quanID: qid }, { quanID: newQid });
        try {

            res.redirect('/chiTiet?keyword=' + newQid);
            // or wherever you want to redirect after saving
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
}

controller.xoaPhuong = async (req, res) => {
    try {
        const qid = req.params.quanID;
        const pid = req.params.phuongID;
        await Phuong.deleteOne({ phuongID: pid, quanID: qid });
        res.redirect('/chiTiet?keyword=' + qid);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

controller.suaPhuong = async (req, res) => {
    const qid = req.params.quanID;
    const pid = req.params.phuongID;

    const newpid = req.body.PID;
    let temp = await Phuong.findOne({ quanID: qid, phuongID: newpid });
    if (temp != null) {
        res.send('<script>alert("PhuongID is defined"); window.location="/chiTiet?keyword=' + qid + '";</script>')
    }
    else {

        await Phuong.updateOne({ quanID: qid, phuongID: pid }, { phuongID: newpid })
        try {

            res.redirect('/chiTiet?keyword=' + qid);
            // or wherever you want to redirect after saving
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
}

controller.themPhuong = async (req, res) => {
    const qid = req.params.quanID;
    const pid = req.body.PID;
    let temp = await Phuong.findOne({ quanID: qid, phuongID: pid });
    if (temp != null) {
        res.send('<script>alert("PhuongID is defined"); window.location="/chiTiet?keyword=' + qid + '";</script>');
    }
    else {
        const newPhuong = new Phuong({ quanID: qid, phuongID: pid });
        try {
            await newPhuong.save();
            res.redirect('/chiTiet?keyword=' + qid);
            // or wherever you want to redirect after saving
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
};
controller.chiTiet = async (req, res) => {
    const keyword = req.query.keyword;
    let quan = await Quan.findOne({ quanID: keyword });
    res.locals.phuong = await Phuong.find({ quanID: keyword });

    ;
    res.render('So-QLQuanPhuong', {
        layout: 'So',
        quan: quan
    });
};
controller.xoaQuan = async (req, res) => {
    try {
        const keyword = req.query.keyword;

        await Quan.deleteOne({ quanID: keyword });
        await Phuong.deleteMany({ quanID: keyword });
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }

}
controller.showQuan = async (req, res) => {
    res.locals.quan = await Quan.find({});
    res.render('So-Index', {
        layout: 'So',
    });
}
controller.addQuan = async (req, res) => {
    const keyword = req.body.QID;

    const temp = await Quan.findOne({ quanID: keyword });
    if (temp != null) {
        res.send('<script>alert("quanID is defined"); window.location="/showQuan";</script>');
    } else {
        const newQuan = new Quan({ quanID: keyword });
        try {
            await newQuan.save();
            res.redirect('/'); // or wherever you want to redirect after saving
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
};
controller.showPhuongMap = async (req, res) => {
    let locations = await Location.find({
        phuongID: req.session.user.phuong,
        quanID: req.session.user.quan
    }).lean();
    for (location of locations) {
        location.hasReport = !!await Report.findOne({ queryID: location.locationID , tinhtrang: "Chưa xử lí"});
        location.billboard = await Billboard.find({ locationID: location.locationID });
        if (location.hasReport == false) {
            for (billboard of location.billboard) {
                if (location.hasReport == false) {
                    location.hasReport = !!await Report.findOne({ queryID: billboard.billboardID , tinhtrang: "Chưa xử lí"});
                }
                else break;
            }
        }
    }
    res.locals.locations = locations;
    res.render('Phuong-Map', {
        layout: 'Phuong'
    });
};
controller.showPhuongMapDetail = async (req, res) => {
    let locations = await Location.find({
        phuongID: req.session.user.phuong,
        quanID: req.session.user.quan
    }).lean();
    for (location of locations) {
        location.hasReport = !!await Report.findOne({ queryID: location.locationID, tinhtrang: "Chưa xử lí"});
        location.billboard = await Billboard.find({ locationID: location.locationID });
        if (location.hasReport == false) {
            for (billboard of location.billboard) {
                if (location.hasReport == false) {
                    location.hasReport = !!await Report.findOne({ queryID: billboard.billboardID, tinhtrang: "Chưa xử lí" });
                }
                else break;
            }
        }
    }
    res.locals.locations = locations;

    res.locals.querylocation = await Location.findOne({
        locationID: req.query.locationID
    });

    billboards = await Billboard.find({
        locationID: req.query.locationID
    }).lean();
    for (billboard of billboards) {
        let reports = await Report.find({
            queryID: billboard.billboardID,
            tinhtrang: "Chưa xử lí"
        }).lean();
        for (let report of reports) {
            let date = new Date(report.thoidiemgui);
            let day = ("0" + date.getDate()).slice(-2); // Get the day of the month (from 1 to 31)
            let month = ("0" + (date.getMonth() + 1)).slice(-2); // Get the month (from 0 to 11)
            let year = date.getFullYear(); // Get the full year
            report.thoidiemgui = `${day}-${month}-${year}`; // Combine the day, month, and year into a string
        }
        billboard.reports = reports;
    }
    res.locals.billboards = billboards;

    reports = await Report.find({
        queryID: req.query.locationID,
        tinhtrang: "Chưa xử lí"
    }).lean();
    for (let report of reports) {
        let date = new Date(report.thoidiemgui);
        let day = ("0" + date.getDate()).slice(-2); // Get the day of the month (from 1 to 31)
        let month = ("0" + (date.getMonth() + 1)).slice(-2); // Get the month (from 0 to 11)
        let year = date.getFullYear(); // Get the full year
        report.thoidiemgui = `${day}-${month}-${year}`; // Combine the day, month, and year into a string
    }
    res.locals.reports = reports;

    res.render('Phuong-Map-Detail', {
        layout: 'Phuong'
    });
};
controller.showIndex = async (req, res) => {
    if (req.session.user.chucvu == 'phuong') {
        res.redirect('/Phuong-Map');
    }
    if (req.session.user.chucvu == 'quan')
        res.render('Phuong-Map', {
            layout: 'Quan',
        });
    if (req.session.user.chucvu == 'so')
        res.redirect('/showQuan');
};
controller.showLogin = (req, res) => {
    let reqUrl = req.query.reqUrl ? req.query.reqUrl : '/';
    if (req.session.user) {
        return res.redirect(reqUrl);
    }
    res.render('login', {
        layout: false,
        reqUrl,
        username: req.signedCookies.username,
        password: req.signedCookies.password,
    });
};
controller.login = async (req, res) => {
    let { username, password, rememberMe } = req.body;
    let user = await User.findOne({ userID: username });
    if (user && await bcrypt.compare(password, user.password)) {
        let reqUrl = req.body.reqUrl ? req.body.reqUrl : '/';
        req.session.user = user;
        if (rememberMe) {
            res.cookie('username', username, {
                maxAge: 60 * 60 * 1000,
                httpOnly: false,
                signed: true,
            });
            res.cookie('password', password, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true,
                signed: true,
            });
        }
        return res.redirect(reqUrl);
    }
    return res.render('login', {
        layout: false,
        message: 'Tên tài khoản hoặc mật khẩu sai'
    });
};
controller.logout = (req, res, next) => {
    req.session.destroy(function (error) {
        if (error) return next(error);
        res.redirect('/login');
    });
};
controller.isLoggedIn = async (req, res, next) => {
    if (req.session.user) {
        res.locals.user = req.session.user;
        return next();
    }
    else {
        res.redirect('/login');
    }
};
controller.themHinhThucBC = async (req, res) => {

    const ten = req.body.tenHinhThucBC;
    const newReportType = new ReportType({ name: ten });
    try {
        await newReportType.save();
        res.redirect('/showLoaiQC'); // or wherever you want to redirect after saving
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
controller.xoaReportType = async (req, res) => {
    try {
        const ht = req.params.name;
        await ReportType.deleteOne({ name: ht });
        res.redirect('/showLoaiQC');
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
controller.suaReportType = async (req, res) => {
    const ht = req.params.name;

    const newHT = req.body.HTBC;
    await ReportType.updateOne({ name: ht }, { name: newHT })
    try {

        res.redirect('/showLoaiQC');

        // or wherever you want to redirect after saving
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}
controller.showRegister = async (req, res) => {
    res.render('So-TTKCCB', {
        layout: 'so'
    });
}
controller.showTKBC = async (req, res) => {
    res.render('So-ThongKeBaoCao', {
        layout: 'so'
    });
}

controller.showTKCXL = async (req, res) => {
    let report = Report.find({});
    res.render('So-ThongKeCXL', {
        layout: 'so',
        report: report
    });
}
controller.xetDuyetChinhSua = async (req, res) => {
    res.render('So-XDCS', {
        layout: 'so'
    });
}
controller.yeuCauCapPhep = async (req, res) => {
    res.render('So-YCCP', {
        layout: 'so'
    });
}
controller.DDQCdetail = async (req, res) => {
    const keyword = req.query.keyword;
    let location = await Location.findOne({ locationID: keyword });
    let billboard = await Billboard.find({ locationID: keyword });
    res.render('So-DDQC-detail', {
        layout: 'so',
        billboard: billboard,
        location: location
    });
}
controller.addLocation = async (req, res) => {
    const lat = req.body.lat;
    const lng = req.body.lng;
    const htqc = req.body.HTQC;
    const QHCQH = req.body.QHCQH;
    const lvt = req.body.LVT;
    const qid = req.body.QIDD;
    const pid = req.body.PIDD;
    const address = req.body.address;
    const addressdetail = req.body.address_detail;
    const imgurl = req.body.imgrul;
    console.log(lat, lng, htqc, QHCQH, lvt, qid, pid, address, addressdetail);

    const temp = await Location.findOne({ toadoX: lat, toadoY: lng });
    const num = await Location.find({ quanID: qid, phuongID: pid });
    if (temp != null) {
        res.send('<script>alert("Location is defined"); window.location="/DDQCmap";</script>');
    } else {
        const newLocation = new Location({
            locationID: pid + qid + '_' + num.length,
            name: address,
            diachi: addressdetail,
            phuongID: pid,
            quanID: qid,
            loaivitri: lvt,
            hinhanh: imgurl,
            hinhthuc: htqc,
            quyhoach: QHCQH,
            toadoX: lat,
            toadoY: lng,
        });
        try {
            await newLocation.save();
            res.redirect('/showLocation'); // or wherever you want to redirect after saving
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
    // const newReportType = new ReportType({ name: ten });
    // try {
    //     await newReportType.save();
    //     res.redirect('/showLoaiQC'); // or wherever you want to redirect after saving
    // } catch (err) {
    //     console.error(err);
    //     res.status(500).send('Server Error');
    // }
};
controller.register = async (req, res) => {
    const lastname = req.body.lastname;
    const firstname = req.body.firstname;
    const date = req.body.date;
    const username = req.body.username;
    let password = req.body.password;
    const quan = req.body.quan;
    const phuong = req.body.phuong;
    const telephone = req.body.telephone;
    const email = req.body.email;
    const chucvu = req.body.chucvu;
    const temp = await User.findOne({ userID: username });
    if (temp != null) {
        res.send('<script>alert("user name is defined"); window.location="/showRegister";</script>');
    } else {
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);
        password = hashedPassword;
        const newUser = new User({
            userID: username,
            password: password,
            chucvu: chucvu,
            hoTen: lastname + ' ' + firstname,
            nsinh: date,
            email: email,
            sdt: telephone,
            phuong: phuong,
            quan: quan,

        });
        try {
            await newUser.save();
            res.send('<script>alert("new user is added"); window.location="/showRegister";</script>');

        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
}

controller.BQCdetail = async (req, res) => {
    const keyword = req.query.keyword;
    const loai = await Loai.find({});
    let billboard = await Billboard.findOne({ billboardID: keyword });
    let hinhthuc = await Hinhthuc.find({});
    res.render('So-BQC-info', {
        layout: 'so',
        billboard: billboard,
        loai: loai,
        hinhthuc : hinhthuc,
    });
}

controller.showaddBQC = async (req, res) => {
    const keyword = req.query.keyword;
    const loai = await Loai.find({});
    let billboard = await Billboard.findOne({ billboardID: keyword });
    let hinhthuc = await Hinhthuc.find({});
    let location = await Location.findOne({locationID : keyword});
    res.render('So-addBQC', {
        layout: 'so',
        billboard: billboard,
        loai: loai,
        hinhthuc : hinhthuc,
        location:location
    });
}

controller.editBQC = async (req, res) => {
    const keyword = req.query.keyword;
    const htqc = req.body.HTQC;
    const lqc = req.body.LQC;
    const imgurl = req.body.imgurl;
    const date = req.body.date;
    const size = req.body.size;
    const amount = req.body.amount;
    console.log( htqc, lqc, imgurl ,date, size , amount);
    //console.log(num.length);

    await Billboard.updateOne({ billboardID: keyword }, {
        loai: lqc,
        hinhanh: imgurl,
        hinhthuc: htqc,
        ngayhethan: date,
        soluong: amount,
        kichthuoc: size,
    });
    try {
        res.redirect('/showLocation'); // or wherever you want to redirect after saving
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}



controller.addBQC = async (req, res) => {
    const keyword = req.query.keyword;
    const htqc = req.body.HTQC;
    const lqc = req.body.LQC;
    const imgurl = req.body.imgurl;
    const date = req.body.date;
    const size = req.body.size;
    const amount = req.body.amount;
    //console.log(num.length);
    const num = await Billboard.find({}).length;
    const newBillboard = new Billboard({
        locationID : keyword,
        billboardID: 'b' + num,
        loai: lqc,
        hinhanh: imgurl,
        hinhthuc: htqc,
        ngayhethan: date,
        soluong: amount,
        kichthuoc: size,
    });
    try {
        await newBillboard.save();
        res.send('<script>alert("new billboard is added"); window.location="/DDQCdetail?keyword=' + keyword + '";</script>');

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

controller.deleteBQC = async (req, res) => {
    try {
        const keyword = req.query.keyword;

        await Billboard.deleteOne({ billboardID: keyword });
        res.redirect('/showLocation');
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }

}

controller.getReports = async (req, res) => {
    try {
        // Lấy tất cả các bảng locations
        const arrayReport = await Report.find({});
        res.json(arrayReport);
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
    }
};
module.exports = controller;