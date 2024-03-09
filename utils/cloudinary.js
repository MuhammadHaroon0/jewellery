const cloudinary = require('cloudinary').v2;
const { jewellryModel } = require('../models/jewellryModel');
const AppError = require('./AppError');
const catchAsync = require('./catchAsync');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


exports.uploadToCloudinary = catchAsync(async (req, res, next) => {
    if (!req.file) return next();
    const uploadResult = await new Promise((resolve) => {
        cloudinary.uploader.upload_stream((error, uploadResult) => {
            if (error) {
                return next(new AppError(500, "Internal server error"))
            }

            return resolve(uploadResult);
        }).end(req.file.buffer);
    });

    req.body.image = uploadResult.secure_url
    next()
});
exports.deleteFromCloudinary = catchAsync(async (req, res, next) => {
    const jewellry = await jewellryModel.findById(req.params.id)
    let filename
    if (jewellry) {
        const url = jewellry.image
        if (url === 'https://res.cloudinary.com/djmlypicw/image/upload/v1709749612/pkpnjfz55dywuaakptx6.jpg')
            return next()
        const segments = url.split('/');
        const filenameWithExtension = segments[segments.length - 1];
        filename = filenameWithExtension.split('.')[0]; // remove file extension
    }
    try {
        const result = await cloudinary.uploader.destroy(filename);
        // console.log(result);
    } catch (error) {
        console.log(error);
    }
    next()
})


