"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
;
var variableSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    datablock: { type: mongoose_1.Types.ObjectId, required: true },
    offset: { type: Number, required: true },
    offsetDecimal: { type: Number, required: false },
    type: { type: String, required: true },
    rwMode: { type: String, required: false },
    value: { type: String, required: false },
    valueToWrite: { type: String, required: false }
});
var variable = (0, mongoose_1.model)('variable', variableSchema);
exports["default"] = variable;
