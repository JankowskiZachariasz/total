"use strict";
exports.__esModule = true;
var fields_1 = require("@keystonejs/fields");
var datablockSchema = {
    fields: {
        name: { type: fields_1.Text, isRequired: true },
        ip: { label: "PLC IP", type: fields_1.Text, isRequired: true },
        dbNumber: { type: fields_1.Integer, isRequired: true }
    },
    labelField: "name",
    adminConfig: {
        defaultColumns: 'name, ip, dbNumber'
    }
};
exports["default"] = datablockSchema;
