"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
;
var conveyorSchema = new mongoose_1.Schema({
    _id: { type: String, required: false },
    plcId: { type: Number, required: false },
    position0: { type: Boolean, required: false },
    position1: { type: Boolean, required: false },
    position2: { type: Boolean, required: false },
    position3: { type: Boolean, required: false },
    packageId: { type: Number, required: false },
    colorClicked: { type: String, required: false },
    colorRegular: { type: String, required: false }
});
var conveyor = (0, mongoose_1.model)('conveyor', conveyorSchema);
exports["default"] = conveyor;
