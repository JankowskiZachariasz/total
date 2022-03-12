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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
require('dotenv').config();
var variablePaczkaTriggers_1 = require("./variablePaczkaTriggers");
var paczkiTriggerHandler = /** @class */ (function () {
    function paczkiTriggerHandler() {
    }
    paczkiTriggerHandler.prototype.checkIfDuplicateExists = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var paczkasData;
                        var _a, _b, _c;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    console.log('paczkiTriggerHandler.ts [28]: Prventing duplicate creation ' + props.resolvedData.enumerator);
                                    console.log('paczkiTriggerHandler.ts [28]: Prventing duplicate creation ' + props.resolvedData.type);
                                    return [4 /*yield*/, props.context.executeGraphQL({
                                            context: props.context,
                                            query: "   \n                query MyQuerry($enumerator: String!, $recordType : paczkaTypeType!) {\n                    data: allPaczkas(where: { \n                      type: $recordType\n                      enumerator: $enumerator\n                    }) {\n                        id\n                    }\n                }\n                        ",
                                            variables: {
                                                enumerator: props.resolvedData.enumerator,
                                                recordType: props.resolvedData.type
                                            }
                                        })];
                                case 1:
                                    paczkasData = _d.sent();
                                    if (((_b = (_a = paczkasData === null || paczkasData === void 0 ? void 0 : paczkasData.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                                        console.log('paczkiTriggerHandler.ts [28]: Prventing duplicate creation ' + ((_c = paczkasData === null || paczkasData === void 0 ? void 0 : paczkasData.data) === null || _c === void 0 ? void 0 : _c.data));
                                        resolve(true);
                                    }
                                    else {
                                        resolve(false);
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    paczkiTriggerHandler.prototype.onDataChange = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var enumerator, allPaczkas, e_1;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    enumerator = (_a = props === null || props === void 0 ? void 0 : props.updatedItem) === null || _a === void 0 ? void 0 : _a.enumerator;
                                    allPaczkas = {};
                                    _b.label = 1;
                                case 1:
                                    _b.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, this.fetchPaczkasByEnumerator([enumerator], props)];
                                case 2:
                                    allPaczkas = _b.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_1 = _b.sent();
                                    reject(e_1);
                                    return [3 /*break*/, 4];
                                case 4: 
                                //execute an appropriate action
                                return [4 /*yield*/, this.resolveEntityLevelConsistancy(allPaczkas, props)];
                                case 5:
                                    //execute an appropriate action
                                    _b.sent();
                                    return [4 /*yield*/, this.resolveFieldLevelConsistancy(allPaczkas, props)];
                                case 6:
                                    _b.sent();
                                    resolve();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    paczkiTriggerHandler.prototype.resolveEntityLevelConsistancy = function (allPaczkas, props) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, Promise.all(Object.keys(allPaczkas).map(function (key) { return __awaiter(_this, void 0, void 0, function () {
                                        var A, B, C, product, _a;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    A = allPaczkas[key][0] != null ? 1 : 0;
                                                    B = allPaczkas[key][1] != null ? 1 : 0;
                                                    C = allPaczkas[key][2] != null ? 1 : 0;
                                                    product = (A * 4) + (B * 2) + (C * 1);
                                                    console.log(product);
                                                    _a = product;
                                                    switch (_a) {
                                                        case (0): return [3 /*break*/, 1];
                                                        case (1): return [3 /*break*/, 2];
                                                        case (2): return [3 /*break*/, 4];
                                                        case (3): return [3 /*break*/, 6];
                                                        case (4): return [3 /*break*/, 8];
                                                        case (5): return [3 /*break*/, 10];
                                                        case (6): return [3 /*break*/, 12];
                                                        case (7): return [3 /*break*/, 14];
                                                    }
                                                    return [3 /*break*/, 15];
                                                case 1:
                                                    {
                                                        return [3 /*break*/, 15];
                                                    } //stable
                                                    _b.label = 2;
                                                case 2:
                                                    delete allPaczkas[key][2].id;
                                                    return [4 /*yield*/, variablePaczkaTriggers_1["default"].createPaczkas([{ data: __assign(__assign({}, allPaczkas[key][2]), { type: 'DB_EDIT' }) }], props === null || props === void 0 ? void 0 : props.context)];
                                                case 3:
                                                    _b.sent();
                                                    return [3 /*break*/, 15];
                                                case 4: return [4 /*yield*/, this.addToPLC(allPaczkas[key][1], props === null || props === void 0 ? void 0 : props.context)];
                                                case 5:
                                                    _b.sent();
                                                    return [3 /*break*/, 15];
                                                case 6:
                                                    delete allPaczkas[key][2].id;
                                                    return [4 /*yield*/, variablePaczkaTriggers_1["default"].createPaczkas([{ data: __assign(__assign({}, allPaczkas[key][2]), { type: 'DB_REF' }) }], props.context)];
                                                case 7:
                                                    _b.sent();
                                                    return [3 /*break*/, 15];
                                                case 8: return [4 /*yield*/, variablePaczkaTriggers_1["default"].deletePaczkas([allPaczkas[key][0].id], props === null || props === void 0 ? void 0 : props.context)];
                                                case 9:
                                                    _b.sent();
                                                    return [3 /*break*/, 15];
                                                case 10: return [4 /*yield*/, this.deleteFromPLC(allPaczkas[key][2], props === null || props === void 0 ? void 0 : props.context)];
                                                case 11:
                                                    _b.sent();
                                                    return [3 /*break*/, 15];
                                                case 12: return [4 /*yield*/, variablePaczkaTriggers_1["default"].deletePaczkas([allPaczkas[key][1].id], props === null || props === void 0 ? void 0 : props.context)];
                                                case 13:
                                                    _b.sent();
                                                    return [3 /*break*/, 15];
                                                case 14:
                                                    {
                                                        return [3 /*break*/, 15];
                                                    } //stable
                                                    _b.label = 15;
                                                case 15: return [2 /*return*/];
                                            }
                                        });
                                    }); }))];
                                case 1:
                                    _a.sent();
                                    resolve();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    paczkiTriggerHandler.prototype.resolveFieldLevelConsistancy = function (allPaczkas, props) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, Promise.all(Object.keys(allPaczkas).map(function (key) { return __awaiter(_this, void 0, void 0, function () {
                                        var iterable, temp1, temp2, temp3, currentTripple, id, id;
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!(allPaczkas[key][0] != null && allPaczkas[key][1] != null && allPaczkas[key][2] != null)) return [3 /*break*/, 7];
                                                    iterable = {
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
                                                    temp1 = {};
                                                    Object.assign(temp1, allPaczkas[key][0]);
                                                    temp2 = {};
                                                    Object.assign(temp2, allPaczkas[key][1]);
                                                    temp3 = {};
                                                    Object.assign(temp3, allPaczkas[key][2]);
                                                    currentTripple = [temp1, temp2, temp3];
                                                    return [4 /*yield*/, Promise.all(Object.keys(iterable).map(function (fieldKey) { return __awaiter(_this, void 0, void 0, function () {
                                                            var L1, L2, L3;
                                                            return __generator(this, function (_a) {
                                                                L1 = allPaczkas[key][0][fieldKey];
                                                                L2 = allPaczkas[key][1][fieldKey];
                                                                L3 = allPaczkas[key][2][fieldKey];
                                                                if (!(L1 == L2 && L2 == L3)) {
                                                                    if ((L1 == L2) && (L1 != L3) && (L2 != L3)) { // AAB -> A=B
                                                                        console.log('AAB -> A=B');
                                                                        //currentTripple[0][fieldKey]=currentTripple[2][fieldKey];
                                                                        currentTripple[1][fieldKey] = currentTripple[2][fieldKey];
                                                                    }
                                                                    else if ((L3 == L2) && (L1 != L3) && (L1 != L2)) { // ABB -> A=B
                                                                        console.log('ABB -> A=B');
                                                                        currentTripple[0][fieldKey] = currentTripple[2][fieldKey];
                                                                    }
                                                                    else if ((L1 == L3) && (L1 != L2) && (L3 != L2)) { // BAB -> B=A
                                                                        console.log('BAB -> B=A');
                                                                        //currentTripple[0][fieldKey]=currentTripple[1][fieldKey];
                                                                        currentTripple[2][fieldKey] = currentTripple[1][fieldKey];
                                                                    }
                                                                    else if ((L1 != L3) && (L1 != L2) && (L3 != L2)) { // ABC -> B=C
                                                                        console.log('BAB -> B=A');
                                                                        //currentTripple[0][fieldKey]=currentTripple[1][fieldKey];
                                                                        currentTripple[1][fieldKey] = currentTripple[2][fieldKey];
                                                                    }
                                                                }
                                                                return [2 /*return*/];
                                                            });
                                                        }); }))];
                                                case 1:
                                                    _a.sent();
                                                    if (!!this.comparePaczkas(allPaczkas[key][0], currentTripple[0])) return [3 /*break*/, 3];
                                                    id = currentTripple[0].id;
                                                    delete currentTripple[0].id;
                                                    return [4 /*yield*/, variablePaczkaTriggers_1["default"].updatePaczkas([{ id: id, data: currentTripple[0] }], props === null || props === void 0 ? void 0 : props.context)];
                                                case 2:
                                                    _a.sent();
                                                    _a.label = 3;
                                                case 3:
                                                    if (!!this.comparePaczkas(allPaczkas[key][1], currentTripple[1])) return [3 /*break*/, 5];
                                                    id = currentTripple[1].id;
                                                    delete currentTripple[1].id;
                                                    return [4 /*yield*/, variablePaczkaTriggers_1["default"].updatePaczkas([{ id: id, data: currentTripple[1] }], props === null || props === void 0 ? void 0 : props.context)];
                                                case 4:
                                                    _a.sent();
                                                    _a.label = 5;
                                                case 5:
                                                    if (!!this.comparePaczkas(allPaczkas[key][2], currentTripple[2])) return [3 /*break*/, 7];
                                                    return [4 /*yield*/, this.modifyPLC(currentTripple[2], props === null || props === void 0 ? void 0 : props.context)];
                                                case 6:
                                                    _a.sent();
                                                    _a.label = 7;
                                                case 7: return [2 /*return*/];
                                            }
                                        });
                                    }); }))];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    paczkiTriggerHandler.prototype.comparePaczkas = function (paczka1, paczka2) {
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
    paczkiTriggerHandler.prototype.resolveGlobalEintityLevelConsistancy = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    paczkiTriggerHandler.prototype.fetchPaczkasByEnumerator = function (enums, props) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var paczkasData, e_2, toReturn;
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    paczkasData = {};
                                    _c.label = 1;
                                case 1:
                                    _c.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, props.context.executeGraphQL({
                                            context: props.context,
                                            query: "   \n                    query MyQuerry($enumerators: [String]!) {\n                        data: allPaczkas(where: { \n                          enumerator_in: $enumerators,\n                        }) {\n                            id\n                            enumerator\n                            name\n                            type\n                            lPaczek\n                            nrPaczki\n                            nrSeryjny1\n                            nrSeryjny2\n                            nrSeryjny3\n                            plcId\n                            dlugosc\n                            }\n                        }\n                            ",
                                            variables: {
                                                enumerators: enums
                                            }
                                        })];
                                case 2:
                                    paczkasData = _c.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_2 = _c.sent();
                                    reject(e_2);
                                    return [3 /*break*/, 4];
                                case 4:
                                    toReturn = {};
                                    //go through results and build an answer
                                    (_b = (_a = paczkasData === null || paczkasData === void 0 ? void 0 : paczkasData.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.forEach(function (paczka) {
                                        var currentEnum = paczka.enumerator;
                                        if (!toReturn.hasOwnProperty(currentEnum)) {
                                            toReturn[currentEnum] = [null, null, null];
                                        }
                                        switch (paczka.type) {
                                            case ('DB_REF'): {
                                                toReturn[currentEnum][0] = paczka;
                                                break;
                                            }
                                            case ('DB_EDIT'): {
                                                toReturn[currentEnum][1] = paczka;
                                                break;
                                            }
                                            case ('PLC'): {
                                                toReturn[currentEnum][2] = paczka;
                                                break;
                                            }
                                        }
                                    });
                                    resolve(toReturn);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    paczkiTriggerHandler.prototype.deleteFromPLC = function (toDelete, apolloContext) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var operacja, indexToDelete, result, e_3;
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    operacja = {};
                                    indexToDelete = Number.parseInt((_a = toDelete === null || toDelete === void 0 ? void 0 : toDelete.enumerator) === null || _a === void 0 ? void 0 : _a.substring(6, (_b = toDelete === null || toDelete === void 0 ? void 0 : toDelete.enumerator) === null || _b === void 0 ? void 0 : _b.length));
                                    operacja.name = 'PLC_DELETE_' + toDelete.name;
                                    operacja.datablock = { connect: { id: process.env.API_DB_ID } };
                                    operacja.operation = 'Paczki_DELETE';
                                    operacja.payload = JSON.stringify(__assign(__assign({}, toDelete), { plcId: indexToDelete }));
                                    operacja.status = 'Pending';
                                    operacja.timeSubmitted = Date.now().toString();
                                    if (!toDelete) return [3 /*break*/, 4];
                                    _c.label = 1;
                                case 1:
                                    _c.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, apolloContext.executeGraphQL({
                                            context: apolloContext,
                                            query: "   mutation MyMutation($newOperacje: OperacjePLCCreateInput!){\n                            createOperacjePLC( data: $newOperacje){id}\n                        }",
                                            variables: { newOperacje: operacja }
                                        })];
                                case 2:
                                    result = _c.sent();
                                    if (result.errors) {
                                        throw new Error(result.errors);
                                    }
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_3 = _c.sent();
                                    console.log(e_3);
                                    reject(e_3);
                                    return [3 /*break*/, 4];
                                case 4:
                                    resolve();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    paczkiTriggerHandler.prototype.addToPLC = function (toAdd, apolloContext) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var operacja, result, e_4;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    operacja = {};
                                    operacja.name = 'Paczki_CREATE_' + toAdd.name;
                                    operacja.datablock = { connect: { id: process.env.API_DB_ID } };
                                    operacja.operation = 'Paczki_CREATE';
                                    operacja.payload = JSON.stringify(toAdd);
                                    operacja.status = 'Pending';
                                    operacja.timeSubmitted = Date.now().toString();
                                    if (!toAdd) return [3 /*break*/, 4];
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, apolloContext.executeGraphQL({
                                            context: apolloContext,
                                            query: "   mutation MyMutation($newOperacje: OperacjePLCCreateInput!){\n                            createOperacjePLC( data: $newOperacje){id}\n                        }",
                                            variables: { newOperacje: operacja }
                                        })];
                                case 2:
                                    result = _a.sent();
                                    if (result.errors) {
                                        throw new Error(result.errors);
                                    }
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_4 = _a.sent();
                                    console.log(e_4);
                                    reject(e_4);
                                    return [3 /*break*/, 4];
                                case 4:
                                    resolve();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    paczkiTriggerHandler.prototype.modifyPLC = function (toModify, apolloContext) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var operacja, indexToModify, result, e_5;
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    operacja = {};
                                    indexToModify = Number.parseInt((_a = toModify === null || toModify === void 0 ? void 0 : toModify.enumerator) === null || _a === void 0 ? void 0 : _a.substring(6, (_b = toModify === null || toModify === void 0 ? void 0 : toModify.enumerator) === null || _b === void 0 ? void 0 : _b.length));
                                    operacja.name = 'Paczki_UPDATE' + toModify.name;
                                    operacja.datablock = { connect: { id: process.env.API_DB_ID } };
                                    operacja.operation = 'Paczki_UPDATE';
                                    operacja.payload = JSON.stringify(__assign(__assign({}, toModify), { plcId: indexToModify }));
                                    operacja.status = 'Pending';
                                    operacja.timeSubmitted = Date.now().toString();
                                    if (!toModify) return [3 /*break*/, 4];
                                    _c.label = 1;
                                case 1:
                                    _c.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, apolloContext.executeGraphQL({
                                            context: apolloContext,
                                            query: "   mutation MyMutation($newOperacje: OperacjePLCCreateInput!){\n                            createOperacjePLC( data: $newOperacje){id}\n                        }",
                                            variables: { newOperacje: operacja }
                                        })];
                                case 2:
                                    result = _c.sent();
                                    if (result.errors) {
                                        throw new Error(result.errors);
                                    }
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_5 = _c.sent();
                                    console.log(e_5);
                                    reject(e_5);
                                    return [3 /*break*/, 4];
                                case 4:
                                    resolve();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    return paczkiTriggerHandler;
}());
exports["default"] = new paczkiTriggerHandler();
