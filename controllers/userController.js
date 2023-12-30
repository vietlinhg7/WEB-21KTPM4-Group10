const mongoose = require('mongoose');
const Report = require('../models/report');

const controller = {};

controller.addReport = async (req, res) => {

    console.log(req.body);
    let { reportType, fullName, email, phone, reportContent} = req.body;
    // const image1 = req.file('image1'); // Sử dụng req.file để lấy dữ liệu tệp từ trường input file 'image1'
    // const image2 = req.file('image2');

    // Chuyển đổi dữ liệu ảnh từ base64 sang Buffer
    // const bufferImage1 = Buffer.from(image1.buffer.toString('base64'), 'base64');
    // const bufferImage2 = Buffer.from(image2.buffer.toString('base64'), 'base64');
  
    try {
        const uri = "mongodb+srv://nhom10:web21ktpm@cluster0.uveminn.mongodb.net/Dan?retryWrites=true&w=majority";
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        
        await Report.create({
            reportType,
            fullName,
            email,
            phone,
            reportContent,
            thoidiemgui: new Date(),
            tinhtrang: "Chưa xử lí",
            cachthucxuly: 'null',
            // image1: bufferImage1,
            // image2: bufferImage2,
        });

    
        res.redirect('/Report.html');
        
    } catch (error) {
    res.send("Can not add report!");
    console.error(error);
    } finally {
    mongoose.disconnect();
    }
};
  

  module.exports = controller;
