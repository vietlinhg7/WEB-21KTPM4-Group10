const cloudinary = require("../cloudImage/cloudinary");


const uploadImages = async (req, res, next) => {
    
    try {
        const images = req.files.map((file) => file.path);

        const uploadedImages = [];

        for(let image of images) {
            const results = await cloudinary.uploader.upload(image);
            console.log('kq:', results);
            uploadedImages.push({
                url: results.secure_url,
                publicId: results.secure_id,
            });
        }

        return res.redirect(`/reports?image1=${uploadedImages[0].url}&image2=${uploadedImages[1].url}`);

        return res.status(200).json({
            name: "Uploaded images successfully",
            datas: uploadedImages,
        })

        
    } catch (error) {
        return res.status(400).json({
            name: error.name,
            message: error.message,
        });
    } 
};

module.exports = uploadImages;
