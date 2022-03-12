"use strict";
exports.__esModule = true;
var fields_1 = require("@keystonejs/fields");
/*
These are going to be snapshots from bufforring
**/
var bufforingHistorySchema = {
    fields: {
        bufforedProduct: { label: "buffored Product", type: fields_1.Relationship, isRequired: true, ref: "bufforedProduct" },
        time: { type: fields_1.DateTimeUtc, isRequired: true },
        buffored1: { type: fields_1.Integer, isRequired: false },
        buffored2: { type: fields_1.Integer, isRequired: false },
        buffored3: { type: fields_1.Integer, isRequired: false },
        delivered1: { type: fields_1.Integer, isRequired: false },
        delivered2: { type: fields_1.Integer, isRequired: false },
        delivered3: { type: fields_1.Integer, isRequired: false }
    },
    labelField: "bufforedProduct",
    adminConfig: {
        defaultColumns: ' bufforedProduct , buffored1'
    }
};
exports["default"] = bufforingHistorySchema;
