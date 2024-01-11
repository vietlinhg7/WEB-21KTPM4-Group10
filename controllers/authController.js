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
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const { notify } = require('../routes/authRouter');

controller.showPhuongDDQC = async(req, res) => {
    let locations = await Location.find({
        phuongID: req.session.user.phuong,
        quanID: req.session.user.quan
    });
    res.locals.location = locations;
    console.log(res.locals.location);
    res.render('Phuong-DDQC', {
        layout: 'Phuong'
    });

};

controller.showChangePass = async(req, res) => {
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

controller.editLocation = async (req, res) => {
    const keyword = req.query.keyword;
    let location = await Location.findOne({ locationID: keyword });
    let quan = await Quan.find({});
    let phuong = await Phuong.find({});
    let loaivitri = await Loaivitri.find({});
    let hinhThuc = await Hinhthuc.find({});
    try {
        res.render('So-DDQC-edit', {
            layout: 'So',
            location: location,
            quan: quan,
            phuong: phuong,
            loaivitri : loaivitri,
            hinhThuc : hinhThuc
        });
        // or wherever you want to redirect after saving
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
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ndvlinh21@clc.fitus.edu.vn',
        pass: 'gkil ziel tfsx rldr'
    }
});

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
    let quan = await Quan.find({});
    let phuong = await Phuong.find({});
    let loaivitri = await Loaivitri.find({});
    let hinhThuc = await Hinhthuc.find({});
    res.render('So-DDQC-map', {
        layout: 'So',
        quan: quan,
        phuong: phuong,
        loaivitri : loaivitri,
        hinhThuc : hinhThuc,

    });
}
controller.showLocation = async (req, res) => {
    // res.render('Phuong-xemChiTietCapPhepQuangCao', {
    //     layout: 'So'
    // });
    // res.render('DanhSachBaoCao', {
    //     layout: 'So'
    // });
    let location = await Location.find({});
    res.render('So-DDQC', {
        layout: 'So',
        location: location
    });

    // let location = await Location.find({});
    // res.render('So-DDQC', {
    //     layout: 'So',
    //     location: location
    // });
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
        console.log(qid, pid);
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
        location.hasReport = !!await Report.findOne({ queryID: location.locationID });
        location.billboard = await Billboard.find({ locationID: location.locationID });
        if (location.hasReport == false) {
            for (billboard of location.billboard) {
                if (location.hasReport == false) {
                    location.hasReport = !!await Report.findOne({ queryID: billboard.billboardID });
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
        location.hasReport = !!await Report.findOne({ queryID: location.locationID });
        location.billboard = await Billboard.find({ locationID: location.locationID });
        if (location.hasReport == false) {
            for (billboard of location.billboard) {
                if (location.hasReport == false) {
                    location.hasReport = !!await Report.findOne({ queryID: billboard.billboardID });
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
    console.log(ten);
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
controller.showRegister= async (req, res) => {
    res.render('So-TTKCCB', {
        layout: 'so'
    });
}
controller.showTKBC= async (req, res) => {
    res.render('So-ThongKeBaoCao', {
        layout: 'so'
    });
}
controller.showTKCXL= async (req, res) => {
    res.render('So-ThongKeCXL', {
        layout: 'so'
    });
}
controller.xetDuyetChinhSua= async (req, res) => {
    res.render('So-XDCS', {
        layout: 'so'
    });
}
controller.yeuCauCapPhep= async (req, res) => {
    res.render('So-YCCP', {
        layout: 'so'
    });
}
controller.DDQCdetail= async (req, res) => {
    const keyword = req.query.keyword;
    let location = await Location.findOne({locationID : keyword});
    let billboard = await Billboard.find({locationID : keyword});
    res.render('So-DDQC-detail', {
        layout: 'so',
        billboard : billboard,
        location : location
    });
}
module.exports = controller;