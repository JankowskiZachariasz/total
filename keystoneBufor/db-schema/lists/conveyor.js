"use strict";
exports.__esModule = true;
var fields_1 = require("@keystonejs/fields");
var conveyorSchema = {
    fields: {
        plcId: { type: fields_1.Integer, isRequired: true, isUnique: true },
        position: { type: fields_1.Integer, isRequired: false },
        position0: { type: fields_1.Checkbox, isRequired: false },
        position1: { type: fields_1.Checkbox, isRequired: false },
        position2: { type: fields_1.Checkbox, isRequired: false },
        position3: { type: fields_1.Checkbox, isRequired: false },
        packageId: { type: fields_1.Integer, isRequired: false },
        colorClicked: { label: "Color Clicked", type: fields_1.Text, isRequired: false },
        colorRegular: { label: "Color Regular", type: fields_1.Text, isRequired: false }
    },
    labelField: "plcId",
    adminConfig: {
        defaultColumns: 'plcId, position0, position1'
    }
};
exports["default"] = conveyorSchema;
