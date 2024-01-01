const mongoose = require('mongoose');
const Report = require('../models/report');
const Billboard = require('../models/billboard');

const controller = {};

const getNewReportID = async () => {
    
    try {
      
        // Đếm số lượng tài liệu trong collection "report"
        const reportCount = await Report.countDocuments();

        console.log(`Số lượng tài liệu trong collection "report" của nhom10 là: ${reportCount}`);
    
        // Nếu không có dữ liệu, gán reportID = r01
        if (reportCount == 0) {
            return "r01";
        }
  
        // Nếu có dữ liệu, lấy reportID mới nhất, tăng giá trị và sử dụng nó
        const latestReport = await Report.findOne({}, { reportID: 1 })
        .sort({ reportID: -1 })
        .limit(1);
        console.log(`ReportID last là: ${latestReport}`);

    
        const latestReportID = latestReport.reportID;
        const latestNumber = parseInt(latestReportID.slice(1)); // Lấy phần số từ reportID
        const newNumber = latestNumber + 1;
        const newReportID = "r" + newNumber.toString().padStart(2, "0"); // Tạo reportID mới
    
        return newReportID;
    } catch (error) {
        console.error(error);
        throw error;
    } 
};

controller.addReport = async (req, res) => {

    console.log(req.body);
    let connection;
    let { reportType, fullName, email, phone, reportContent} = req.body;
    
    const reportID = await getNewReportID(); // Lấy reportID mới
    
    try {
        
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
            
        });

    
        res.redirect('/Report.html');
        
    } catch (error) {
        res.send("Can not add report!");
        console.error(error);
    } 
};


controller.getBillboards = async () => {
  try {
      
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
          }
      });
  } catch (error) {
      console.error('Lỗi khi kết nối đến MongoDB:', error);
  }
};
  

  module.exports = controller;
