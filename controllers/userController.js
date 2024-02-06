const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const userModel = require("../models/userModel");
const Response = require("../utils/serverResponse");
const upload = require("./../utils/multerConfig");
const Email = require("../utils/email");
// const sharp = require("sharp");
const invoiceModel = require("../models/invoiceModel");
const { jewellryModelModel } = require("../models/jewellryModel");
const APIFeatures = require("./../utils/apiFeatures");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  let doc = new APIFeatures(
    userModel.find({ isActive: { $ne: false } }),
    req.query
  )
    .filter()
    .sort()
    .paginate()
    .limitFields();
  doc = await doc.query;

  // console.log(result);

  // if(result.length===0)
  // return next(new AppError("Not found",404))
  return res.status(200).json(new Response("success", doc));
});

exports.addCourse = catchAsync(async (req, res, next) => {
  const found = await userModel.findById(req.user.id);
  if (!found) {
    return next(new AppError("Document not found matching this id!", 404));
  }

  /** PAYMENT GATEWAY INTEGRATION */

  if (!found.courses.includes(req.body.courseId)) {
    // console.log(found);
    found.courses.push(req.body.courseId);

    // console.log(found);
    await found.save({ validateBeforeSave: false });
    const course = await courseModel.findById(req.body.courseId);
    await invoiceModel.create({
      courseId: req.body.courseId,
      user: found._id,
      price: course.price,
      courseName: course.name,
      pinCode: new Date().getTime().toString(),
    });
    // await new Email(found).addCourse(req.body.courseId);
  }
  return res.status(200).json(new Response("success", found));
});

exports.withdrawCourse = catchAsync(async (req, res, next) => {
  const found = await userModel.findByIdAndUpdate(
    req.user.id,
    {
      $pull: {
        courses: req.body.courseId,
      },
    },
    {
      new: true,
    }
  );
  if (!found) {
    return next(new AppError("User not found matching this id!", 404));
  }
  await courseProgressModel.deleteOne({
    userId: req.user.id,
    courseId: req.body.courseId,
  });
  return res.status(200).json(new Response("success", found));
});



exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.file) req.body.image = req.file.fileName;
  const doc = await userModel.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    status: "success",
    data: {
      doc,
    },
  });
});

exports.uploadUserImage = upload.single("image");

exports.resizeUserImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.fileName = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/users/${req.file.fileName}`);
  next();
});
