"use strict";
exports.__esModule = true;
var fields_1 = require("@keystonejs/fields");
var variablekSchema = {
    fields: {
        name: { type: fields_1.Text, isRequired: true, isUnique: true },
        datablock: { label: "Datablock", type: fields_1.Relationship, isRequired: true, ref: "datablock" },
        offset: { type: fields_1.Integer, isRequired: true },
        offsetDecimal: { label: "Offset Decimal", type: fields_1.Integer, isRequired: false, defaultValue: function () { return 0; } },
        type: { type: fields_1.Select, isRequired: true,
            options: [
                { value: 'S', label: 'String' },
                { value: 'INT', label: 'Integer' },
                { value: 'DI', label: 'DInt' },
                { value: 'X', label: 'Bit' },
                { value: 'B', label: 'Byte' },
            ]
        },
        rwMode: { label: "Read/Write mode", type: fields_1.Select, isRequired: true,
            options: [
                { value: 'Read', label: 'Read' },
                { value: 'ReadWrite', label: 'Read/Write' },
            ]
        },
        value: { type: fields_1.Text, isRequired: false },
        valueToWrite: { label: "Value to write", type: fields_1.Text, isRequired: false }
    },
    labelField: "name",
    adminConfig: { defaultColumns: 'name, datablock, rwMode' }
};
exports["default"] = variablekSchema;
