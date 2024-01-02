const Report = require('../models/report');
const Billboard = require('../models/billboard');
const Loai = require('../models/loai');
const Location = require('../models/location');


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


controller.getBillboards = async (req, res) => {
    try {
        // Lấy tất cả các bảng billboard
        const billboards = await Billboard.find({});
        res.json(billboards); 
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu billboard:', error);
    }
};

controller.getLoais = async (req, res) => {
    try {
        const loaiID = req.params.loaiID;

        const loaiData = await Loai.findOne({ loaiID });
    
        if (!loaiData) {
            return res.status(404).json({ error: 'Không tìm thấy dữ liệu cho loaiID đã cung cấp.' });
        }
    
        res.json(loaiData);
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        res.status(500).send('Lỗi Nội Bộ của Máy Chủ');
    }
};

controller.getLocations = async (req, res) => {
    try {
        const locationID = req.params.locationID;

        const locationData = await Location.findOne({ locationID });

        if (!locationData) {
        return res.status(404).json({ error: 'Không tìm thấy dữ liệu cho locationID đã cung cấp.' });
        }

        res.json(locationData);
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        res.status(500).send('Lỗi Nội Bộ của Máy Chủ');
    }
};
  

  module.exports = controller;
