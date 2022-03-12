"use strict";
exports.__esModule = true;
var fields_1 = require("@keystonejs/fields");
var bufforedProductSchema = {
    fields: {
        name: { type: fields_1.Text, isRequired: false },
        series1: { type: fields_1.Integer, isRequired: false },
        series2: { type: fields_1.Integer, isRequired: false },
        series3: { type: fields_1.Integer, isRequired: false },
        count1: { type: fields_1.Integer, isRequired: false },
        count2: { type: fields_1.Integer, isRequired: false },
        count3: { type: fields_1.Integer, isRequired: false },
        plcId1: { type: fields_1.Integer, isRequired: false },
        plcId2: { type: fields_1.Integer, isRequired: false },
        plcId3: { type: fields_1.Integer, isRequired: false },
        buffored1: { type: fields_1.Integer, isRequired: false },
        buffored2: { type: fields_1.Integer, isRequired: false },
        buffored3: { type: fields_1.Integer, isRequired: false },
        delivered1: { type: fields_1.Integer, isRequired: false },
        delivered2: { type: fields_1.Integer, isRequired: false },
        delivered3: { type: fields_1.Integer, isRequired: false },
        status: { type: fields_1.Select, isRequired: true,
            options: [
                { value: 'Current', label: 'Na buforze' },
                { value: 'History', label: 'Historyczny' },
            ]
        }
    },
    labelField: "name",
    adminConfig: {
        defaultColumns: ' name , series1'
    }
};
exports["default"] = bufforedProductSchema;
