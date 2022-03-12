"use strict";
exports.__esModule = true;
exports.applySchema = void 0;
var datablock_1 = require("./lists/datablock");
var variable_1 = require("./lists/variable");
var paczki_1 = require("./lists/paczki");
var plcCommands_1 = require("./lists/plcCommands");
var product_1 = require("./lists/product");
function applySchema(keystoneObject) {
    keystoneObject.createList('datablock', datablock_1["default"]);
    keystoneObject.createList('variable', variable_1["default"]);
    keystoneObject.createList('paczka', paczki_1["default"]);
    keystoneObject.createList('operacjePLC', plcCommands_1["default"]);
    keystoneObject.createList('product', product_1["default"]);
}
exports.applySchema = applySchema;
