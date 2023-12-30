const controller = {};
const mongoose = require('mongoose');
const User = require('../models/user');
const Location = require('../models/location');
const Billboard = require('../models/billboard');

controller.showIndex = async (req, res) => {
    if (req.session.user.chucvu == 'phuong') {
        let locations = await Location.find({
            phuongID: req.session.user.phuong,
            quanID: req.session.user.quan
        });
        console.log(locations[0].toadoX);
        res.render('Phuong-Map', {
            layout: 'Phuong',
            locations: locations
        });
    }
    if (req.session.user.chucvu == 'quan')
    res.render('Phuong-Map', {
        layout: 'Quan',
    });
    if (req.session.user.chucvu == 'so')
    res.render('So-Index', {
        layout: 'So',
    });
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
