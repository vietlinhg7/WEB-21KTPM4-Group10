const controller = {};
const mongoose = require('mongoose');
const User = require('../models/user');

controller.showIndex = (req, res) => {
    if (req.session.user.chucvu == 'phuong')
    res.render('Phuong-Map', {
        layout: 'Phuong',
    });
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
    console.log("Hello");
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
    let { username, password} = req.body;
    console.log(username);
    console.log(password);
    let user = await User.findOne({userID: username, password });
    console.log(user);
    if (user) {
      let reqUrl = req.body.reqUrl ? req.body.reqUrl : '/';
      req.session.user = user;
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
