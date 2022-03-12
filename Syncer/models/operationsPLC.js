"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
;
var operacjeSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    datablock: { type: mongoose_1.Types.ObjectId, required: true },
    operation: { type: String, required: true },
    timeSubmitted: { type: String, required: true },
    status: { type: String, required: true },
    payload: { type: String, required: true }
});
var operacje = (0, mongoose_1.model)('operacjeplc', operacjeSchema);
exports["default"] = operacje;
