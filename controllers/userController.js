const mongoose = require('mongoose');
const Report = require('../models/report');
const Billboard = require('../models/billboard');

const controller = {};

const getNewReportID = async () => {
    try {
      const uri = "mongodb+srv://nhom10:web21ktpm@cluster0.uveminn.mongodb.net/Dan?retryWrites=true&w=majority";
      await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
      // Kiểm tra xem có dữ liệu trong bảng Report không
      const isEmpty = await Report.countDocuments() === 0;
  
      // Nếu không có dữ liệu, gán reportID = r01
      if (isEmpty) {
        return "r01";
      }
  
      // Nếu có dữ liệu, lấy reportID mới nhất, tăng giá trị và sử dụng nó
      const latestReport = await Report.findOne({}, { reportID: 1 })
        .sort({ reportID: -1 })
        .limit(1);
  
      const latestReportID = latestReport.reportID;
      const latestNumber = parseInt(latestReportID.slice(1)); // Lấy phần số từ reportID
      const newNumber = latestNumber + 1;
      const newReportID = "r" + newNumber.toString().padStart(2, "0"); // Tạo reportID mới
  
      return newReportID;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      mongoose.disconnect();
    }
  };

controller.addReport = async (req, res) => {

    console.log(req.body);
    let { reportType, fullName, email, phone, reportContent} = req.body;
    
    const reportID = await getNewReportID(); // Lấy reportID mới
    // const image1 = req.file('image1'); // Sử dụng req.file để lấy dữ liệu tệp từ trường input file 'image1'
    // const image2 = req.file('image2');

    // Chuyển đổi dữ liệu ảnh từ base64 sang Buffer
    // const bufferImage1 = Buffer.from(image1.buffer.toString('base64'), 'base64');
    // const bufferImage2 = Buffer.from(image2.buffer.toString('base64'), 'base64');
  
    try {
        const uri = "mongodb+srv://nhom10:web21ktpm@cluster0.uveminn.mongodb.net/Dan?retryWrites=true&w=majority";
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        
        await Report.create({
            reportID,
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


controller.getBillboards = async () => {
  try {
      // Kết nối MongoDB
      const uri = "mongodb+srv://nhom10:web21ktpm@cluster0.uveminn.mongodb.net/nhom10?retryWrites=true&w=majority";
      await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

      // Kiểm tra kết nối
      const db = mongoose.connection;
      db.on('error', console.error.bind(console, 'Lỗi kết nối MongoDB:'));
      db.once('open', async function () {
          console.log('Đã kết nối đến MongoDB');

          try {
              // Lấy tất cả các bảng billboard
              const billboards = await Billboard.find({});

              // In ra dữ liệu billboard
              console.log(billboards);
          } catch (error) {
              console.error('Lỗi khi lấy dữ liệu billboard:', error);
          } finally {
              // Đóng kết nối sau khi hoàn thành
              mongoose.connection.close();
          }
      });
  } catch (error) {
      console.error('Lỗi khi kết nối đến MongoDB:', error);
  }
};
  

  module.exports = controller;
