"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
;
var produktSchema = new mongoose_1.Schema({
    namePlc: { type: String, required: false },
    series1: { type: Number, required: false },
    series2: { type: Number, required: false },
    series3: { type: Number, required: false },
    count: { type: Number, required: false },
    length1: { type: Number, required: false },
    length2: { type: Number, required: false },
    length3: { type: Number, required: false },
    plcId1: { type: Number, required: false },
    plcId2: { type: Number, required: false },
    plcId3: { type: Number, required: false },
    toDelete: { type: Boolean, required: false },
    wasUpdatedByClient: { type: Boolean, required: false },
    name: { type: String, required: false }
});
var produkt = (0, mongoose_1.model)('product', produktSchema);
exports["default"] = produkt;
