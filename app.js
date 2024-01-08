const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const Quan = require('./models/quan');
const Phuong = require('./models/phuong');
const Location = require('./models/location');
const Billboard = require('./models/billboard');
const Loai = require('./models/loai');

const app = express();
const PORT = 4000;
const expressHbs = require("express-handlebars");
const session = require('express-session');
const cookieParser = require('cookie-parser');

var authRouter = require('./routes/authRouter');

// Thiet lap thu muc Static
app.use(express.static(__dirname + "/html"));

//Cau hinh su dung View Template
app.engine(
  "hbs", 
  expressHbs.engine({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    },
})
);
app.set("view engine", "hbs");

const uri = "mongodb+srv://nhom10:web21ktpm@cluster0.uveminn.mongodb.net/nhom10?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// const addLocation = async () => {
//   const newUser = new Location({
//     locationID: "p4q5_1",
//     name: "Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia TP.HCM",
//     diachi: "227 Đ. Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh, Vietnam",
//     phuongID: "4",
//     quanID: "5",
//     loaivitri: "Đất công/Công viên/Hành lang an toàn giao thông",
//     hinhanh: "https://lh5.googleusercontent.com/p/AF1QipMclCpI1Ksxue8H_vB566QeSpmA1USCh4CFprFc=w408-h306-k-no",
//     hinhthuc: "Cổ động chính trị",
//     quyhoach: "Đã quy hoạch",
//     toadoX: 10.7618957,
//     toadoY: 106.6826922
//   });

//   try {
//     const savedUser = await newUser.save();
//     console.log(`User ${savedUser.userID} has been added.`);
//   } catch (error) {
//     console.error(`Error occurred while adding user: ${error}`);
//   }
// };

// addLocation();

// Cau hinh cho phep doc du lieu gui len bang phuong thuc POST
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Thiết lập sử dụng cookies
app.use(cookieParser('COOKIE_SECRET'));

// Thiết lập sử dụng session và lưu trữ session trên Redis
app.use(
    session({
        secret: 'SESSION_SECRET',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false, // if true only transmit cookie over https
            httpOnly: true, // prevent client side JS from reading the cookie
            maxAge: 20 * 60 * 1000, // 20m
        },
    })
);

app.use('/', authRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});