const catchAsync = require("../utils/catchAsync")

const { setModel } = require("../models/setModel");
const Response = require("../utils/serverResponse");


exports.showSetsContainingSpecificJewllery = catchAsync(async (req, res, next) => {
    const sets = await setModel.find({ items: req.body.jewelryId }).populate('items'); // Find sets where items array contains the specific jewelryId and populate the items
    return res.status(200).json(new Response("success", sets));
})