"use strict";
exports.__esModule = true;
var fields_1 = require("@keystonejs/fields");
var paczkiSchema = {
    fields: {
        enumerator: { type: fields_1.Text, isRequired: true },
        name: { type: fields_1.Text, isRequired: false },
        type: { type: fields_1.Select, isRequired: true,
            options: [
                { value: 'PLC', label: 'PLC' },
                { value: 'DB_REF', label: 'DB_REF' },
                { value: 'DB_EDIT', label: 'DB_EDIT' },
            ]
        },
        lPaczek: { type: fields_1.Integer, isRequired: false },
        nrPaczki: { type: fields_1.Integer, isRequired: false },
        nrSeryjny1: { type: fields_1.Integer, isRequired: false },
        nrSeryjny2: { type: fields_1.Integer, isRequired: false },
        nrSeryjny3: { type: fields_1.Integer, isRequired: false },
        plcId: { type: fields_1.Integer, isRequired: false },
        dlugosc: { type: fields_1.Integer, isRequired: false }
    },
    labelField: "enumerator",
    adminConfig: {
        defaultColumns: 'enumerator, name, type, lPaczek'
    }
};
exports["default"] = paczkiSchema;
