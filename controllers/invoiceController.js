const crypto = require('crypto');
const catchAsync = require('../utils/catchAsync');
const invoiceModel = require('../models/invoiceModel');
const Response = require('../utils/serverResponse');

function generatePinCode(length) {
    const bytes = crypto.randomBytes(Math.ceil(length / 2));
    return bytes.toString('hex').slice(0, length);
}
exports.createOne = catchAsync(async (req, res, next) => {
    req.body.pinCode = generatePinCode(6); // Generate a 6-digit pin code
    const doc = await invoiceModel.create(req.body);
    return res.status(201).json(new Response("success", doc));
});
exports.incompletedOrders = catchAsync(async (req, res, next) => {
    const doc = await invoiceModel.find({ isCompleted: false })
    return res.status(200).json(new Response("success", doc));
})
exports.markAsCompleted = catchAsync(async (req, res, next) => {
    const doc = await invoiceModel.findByIdAndUpdate(req.params.id, { isCompleted: true }, { new: true })
    return res.status(200).json(new Response("success", doc));
})


