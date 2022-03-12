"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
;
var paczkaSchema = new mongoose_1.Schema({
    enumerator: { type: String, required: true },
    name: { type: String, required: false },
    type: { type: String, required: false },
    lPaczek: { type: Number, required: false },
    nrPaczki: { type: Number, required: false },
    nrSeryjny1: { type: Number, required: false },
    nrSeryjny2: { type: Number, required: false },
    nrSeryjny3: { type: Number, required: false },
    plcId: { type: Number, required: false },
    dlugosc: { type: Number, required: false }
});
var paczka = (0, mongoose_1.model)('paczka', paczkaSchema);
exports["default"] = paczka;
