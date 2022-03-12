"use strict";
exports.__esModule = true;
var fields_1 = require("@keystonejs/fields");
var settingSchema = {
    fields: {
        settingName: { type: fields_1.Text, isRequired: true },
        value: { type: fields_1.Text, isRequired: false }
    },
    labelField: "settingName",
    adminConfig: {
        defaultColumns: 'settingName, value'
    }
};
exports["default"] = settingSchema;
