"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
;
var datablockSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    ip: { type: String, required: true },
    dbNumber: { type: Number, required: true },
    dbNumber2: { type: Number, required: true }
});
var datablock = (0, mongoose_1.model)('datablock', datablockSchema);
exports["default"] = datablock;
