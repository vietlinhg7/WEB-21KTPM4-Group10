const controller = {};
const mongoose = require('mongoose');
const User = require('../models/user');
const Location = require('../models/location');
const Billboard = require('../models/billboard');
const Quan = require('../models/quan');
const Phuong = require('../models/phuong');
const Loai = require('../models/loai');

controller.xoaLoai = async (req, res) => {
    try {
        const lid = req.params.loaiID;
        const loai = req.params.loai;
        await Loai.deleteOne({ loaiID: lid, loai: loai });
        res.redirect('/showLoaiQC');
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

controller.suaLoai = async (req, res) => {
    const lid = req.params.loaiID;
    const loai = req.params.loai;

    const newLid = req.body.LID;
    console.log(lid,loai,newLid);
    await Loai.updateOne({ loaiID: lid, loai: loai }, { loai: newLid })
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

    res.render('So-LoaiHinhQC', {
        layout: 'So',
        loai: loai,
    });
}

controller.suaQuan = async (req, res) => {
    const qid = req.params.quanID;

    const newQid = req.body.QID;
    console.log(newQid);
    console.log(qid);
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

    await Phuong.updateOne({ quanID: qid, phuongID: pid }, { phuongID: newpid })
    try {

        res.redirect('/chiTiet?keyword=' + qid);
        // or wherever you want to redirect after saving
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

controller.themPhuong = async (req, res) => {
    const qid = req.params.quanID;
    const pid = req.body.PID;

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
    const newQuan = new Quan({ quanID: keyword });
    try {
        await newQuan.save();
        res.redirect('/'); // or wherever you want to redirect after saving
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

controller.showIndex = async (req, res) => {
    if (req.session.user.chucvu == 'phuong') {
        res.locals.locations = await Location.find({
            phuongID: req.session.user.phuong,
            quanID: req.session.user.quan
        });
        res.render('Phuong-Map', {
            layout: 'Phuong'
        });
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
    let user = await User.findOne({ userID: username, password });
    if (user) {
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
        message: 'Sai tên tài khoản hoặc mật khẩu',
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

module.exports = controller;