"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
require('dotenv').config();
var ResolverUtil = /** @class */ (function () {
    function ResolverUtil() {
    }
    ResolverUtil.prototype.generatePaczkaCommandToDeleteFromPLC = function (toDelete) {
        var _a, _b;
        var indexToDelete = Number.parseInt((_a = toDelete === null || toDelete === void 0 ? void 0 : toDelete.enumerator) === null || _a === void 0 ? void 0 : _a.substring(6, (_b = toDelete === null || toDelete === void 0 ? void 0 : toDelete.enumerator) === null || _b === void 0 ? void 0 : _b.length));
        var operation = {
            name: 'PLC_DELETE: ' + toDelete.name,
            datablock: { connect: { id: process.env.API_DB_ID } },
            operation: 'Paczki_DELETE',
            payload: JSON.stringify(__assign(__assign({}, toDelete), { plcId: indexToDelete })),
            status: 'Pending',
            timeSubmitted: Date.now().toString()
        };
        return operation;
    };
    ResolverUtil.prototype.generatePaczkaCommandToCreateOnPLC = function (toAdd) {
        toAdd.plcId = Number.parseInt(toAdd.enumerator.substring(6));
        var operation = {
            name: 'Paczki_CREATE: ' + toAdd.name,
            datablock: { connect: { id: process.env.API_DB_ID } },
            operation: 'Paczki_CREATE',
            payload: JSON.stringify(toAdd),
            status: 'Pending',
            timeSubmitted: Date.now().toString()
        };
        return operation;
    };
    ResolverUtil.prototype.generatePaczkaCommandToModifyOnPLC = function (toModify) {
        var _a, _b;
        var indexToModify = Number.parseInt((_a = toModify === null || toModify === void 0 ? void 0 : toModify.enumerator) === null || _a === void 0 ? void 0 : _a.substring(6, (_b = toModify === null || toModify === void 0 ? void 0 : toModify.enumerator) === null || _b === void 0 ? void 0 : _b.length));
        var name = (toModify === null || toModify === void 0 ? void 0 : toModify.name) ? (toModify === null || toModify === void 0 ? void 0 : toModify.name) : ('');
        var operation = {
            name: 'Paczki_UPDATE: ' + toModify.name,
            datablock: { connect: { id: process.env.API_DB_ID } },
            operation: 'Paczki_UPDATE',
            payload: JSON.stringify(__assign(__assign({}, toModify), { plcId: indexToModify, name: name })),
            status: 'Pending',
            timeSubmitted: Date.now().toString()
        };
        return operation;
    };
    ResolverUtil.prototype.comparePaczkas = function (paczka1, paczka2) {
        var toReturn = (paczka1.name == paczka2.name &&
            paczka1.lPaczek == paczka2.lPaczek &&
            paczka1.nrPaczki == paczka2.nrPaczki &&
            paczka1.nrSeryjny1 == paczka2.nrSeryjny1 &&
            paczka1.nrSeryjny2 == paczka2.nrSeryjny2 &&
            paczka1.nrSeryjny3 == paczka2.nrSeryjny3 &&
            paczka1.plcId == paczka2.plcId &&
            paczka1.dlugosc == paczka2.dlugosc);
        return toReturn;
    };
    ResolverUtil.prototype.paczkaDeepCopy = function (source) {
        var target = {};
        var iterable = {
            _id: '',
            enumerator: '',
            name: '',
            type: '',
            lPaczek: 0,
            nrPaczki: 0,
            nrSeryjny1: 0,
            nrSeryjny2: 0,
            nrSeryjny3: 0,
            plcId: 0,
            dlugosc: 0
        };
        Object.keys(iterable).map(function (fieldKey) {
            target[fieldKey] = source[fieldKey];
        });
        return target;
    };
    return ResolverUtil;
}());
exports["default"] = new ResolverUtil();
