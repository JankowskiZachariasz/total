"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
;
var bufforedProductSchema = new mongoose_1.Schema({
    name: { type: String, required: false },
    series1: { type: Number, required: false },
    series2: { type: Number, required: false },
    series3: { type: Number, required: false },
    count1: { type: Number, required: false },
    count2: { type: Number, required: false },
    count3: { type: Number, required: false },
    plcId1: { type: Number, required: false },
    plcId2: { type: Number, required: false },
    plcId3: { type: Number, required: false },
    buffored1: { type: Number, required: false },
    buffored2: { type: Number, required: false },
    buffored3: { type: Number, required: false },
    delivered1: { type: Number, required: false },
    delivered2: { type: Number, required: false },
    delivered3: { type: Number, required: false },
    status: { type: String, required: false }
});
var bufforedProduct = (0, mongoose_1.model)('bufforedProduct', bufforedProductSchema);
exports["default"] = bufforedProduct;
