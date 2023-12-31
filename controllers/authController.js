const controller = {};
const mongoose = require('mongoose');
const User = require('../models/user');
const Location = require('../models/location');
const Billboard = require('../models/billboard');
const Quan = require('../models/quan');

controller.xoaQuan =async(req,res) => {
    try {
    const keyword = req.body.QID;
    await Quan.deleteOne({quanID: keyword});
    res.json({ success: 1 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }

}
controller.showQuan =async(req,res) => {
    res.locals.quan = await Quan.find({});
    res.render('So-Index', {
        layout: 'So',
    });
}

controller.showSo =async(req,res) => {
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
    let user = await User.findOne({userID: username, password });
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