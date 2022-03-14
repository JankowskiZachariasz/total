"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.PaczkaResolverSingleton = void 0;
var paczka_1 = require("../models/paczka");
var resolverUtil_1 = require("./resolverUtil");
var resolverUtil_2 = require("./resolverUtil");
var OnoToOneResolver = /** @class */ (function () {
    function OnoToOneResolver() {
        this.triples = null;
        this.variableMap = null;
    }
    OnoToOneResolver.prototype.resolve = function (freshVariables) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var dbRecords, recordLevelChanges, fieldLevelChanges, e_1;
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _c.trys.push([0, 2, , 3]);
                                    if (this.variableMap == null)
                                        this.variableMap = this.translateVars(freshVariables);
                                    return [4 /*yield*/, this.queryRecords()];
                                case 1:
                                    dbRecords = _c.sent();
                                    this.DB_REF = dbRecords.DB_REF;
                                    this.DB_EDIT = dbRecords.DB_EDIT;
                                    this.PLC = this.processVariables(this.variableMap);
                                    this.triples = this.deriveTriples(this.DB_REF, this.DB_EDIT, this.PLC);
                                    //console.log(this.triples);
                                    this.PLCcommands = [];
                                    recordLevelChanges = this.enforceRecordLevelConsistancy(this.triples);
                                    this.toDelete = recordLevelChanges.doDelete;
                                    this.toAdd = recordLevelChanges.toAdd;
                                    (_a = this.PLCcommands).push.apply(_a, recordLevelChanges.commands);
                                    fieldLevelChanges = this.enforceFieldLevelConsistancy(this.triples);
                                    this.toModify = fieldLevelChanges.toModify;
                                    (_b = this.PLCcommands).push.apply(_b, fieldLevelChanges.commands);
                                    //console.log('commands:')
                                    //console.log(this.PLCcommands);
                                    //console.log('END commands:')
                                    // console.log(this.toDelete);
                                    // console.log(this.toAdd);
                                    //console.log(this.toModify);
                                    // console.log('Czemu tego nie widać?');
                                    // //console.log(this.PLCcommands);
                                    // console.log('Hmmmmm??');
                                    resolve();
                                    return [3 /*break*/, 3];
                                case 2:
                                    e_1 = _c.sent();
                                    reject(e_1);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    return OnoToOneResolver;
}());
var PaczkaResolver = /** @class */ (function (_super) {
    __extends(PaczkaResolver, _super);
    function PaczkaResolver() {
        var _this = _super.call(this) || this;
        _this.schema = paczka_1["default"];
        return _this;
    }
    PaczkaResolver.prototype.queryRecords = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var ref, edit, retrievedVariables, e_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    ref = [];
                                    edit = [];
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, paczka_1["default"].find({ type: { $in: ['DB_REF', 'DB_EDIT'] } }).exec()];
                                case 2:
                                    retrievedVariables = _a.sent();
                                    retrievedVariables.map(function (m) {
                                        switch (m.type) {
                                            case ('DB_REF'): {
                                                ref.push(m);
                                            }
                                            case ('DB_EDIT'): {
                                                edit.push(m);
                                            }
                                        }
                                    });
                                    resolve({ DB_REF: ref, DB_EDIT: edit });
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_2 = _a.sent();
                                    reject(e_2);
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    PaczkaResolver.prototype.translateVars = function (vars) {
        var toReturn = {};
        vars.map(function (m) {
            if (m.variableRef.name.substring(0, 4) == 'pacz') {
                toReturn[m.variableRef.name] = m.variableRef;
            }
        });
        return toReturn;
    };
    PaczkaResolver.prototype.processVariables = function (vars) {
        var _a;
        var toReturn = [];
        var toReadThoroughly = [];
        var index = 0;
        do {
            index++;
            var currentPlcIndex = (_a = vars['paczka' + index + 'v7']) === null || _a === void 0 ? void 0 : _a.value;
            if (currentPlcIndex != '0' && currentPlcIndex != null && typeof currentPlcIndex != undefined)
                toReadThoroughly.push(index);
        } while (typeof vars['paczka' + (index + 1) + 'v7'] != 'undefined');
        toReadThoroughly.forEach(function (i) {
            var paczka = {
                type: 'PLC',
                enumerator: 'paczka' + i,
                name: vars['paczka' + i + 'v1'].value,
                lPaczek: Number.parseInt(vars['paczka' + i + 'v2'].value),
                nrPaczki: Number.parseInt(vars['paczka' + i + 'v3'].value),
                nrSeryjny1: Number.parseInt(vars['paczka' + i + 'v4'].value),
                nrSeryjny2: Number.parseInt(vars['paczka' + i + 'v5'].value),
                nrSeryjny3: Number.parseInt(vars['paczka' + i + 'v6'].value),
                plcId: Number.parseInt(vars['paczka' + i + 'v7'].value),
                dlugosc: Number.parseInt(vars['paczka' + i + 'v8'].value)
            };
            toReturn.push(paczka);
        });
        return toReturn;
    };
    PaczkaResolver.prototype.deriveTriples = function (DB_REF, DB_EDIT, PLC) {
        var map = {};
        __spreadArray(__spreadArray(__spreadArray([], DB_REF, true), DB_EDIT, true), PLC, true).forEach(function (paczka) {
            var currentEnum = paczka.enumerator;
            if (!map.hasOwnProperty(currentEnum)) {
                map[currentEnum] = [null, null, null];
            }
            switch (paczka.type) {
                case ('DB_REF'): {
                    map[currentEnum][0] = paczka;
                    break;
                }
                case ('DB_EDIT'): {
                    map[currentEnum][1] = paczka;
                    break;
                }
                case ('PLC'): {
                    map[currentEnum][2] = paczka;
                    break;
                }
            }
        });
        return map;
    };
    PaczkaResolver.prototype.enforceRecordLevelConsistancy = function (vars) {
        var _this = this;
        var doDelete = [];
        var toAdd = [];
        var commands = [];
        Object.keys(vars).map(function (key) { return __awaiter(_this, void 0, void 0, function () {
            var A, B, C, product;
            return __generator(this, function (_a) {
                A = vars[key][0] != null ? 1 : 0;
                B = vars[key][1] != null ? 1 : 0;
                C = vars[key][2] != null ? 1 : 0;
                product = (A * 4) + (B * 2) + (C * 1);
                switch (product) {
                    case (0): {
                        break;
                    } //stable
                    case (1): {
                        toAdd.push(__assign(__assign({}, vars[key][2]), { type: 'DB_EDIT' }));
                        break;
                    } //L2=L3
                    case (2): {
                        commands.push(resolverUtil_1["default"].generatePaczkaCommandToCreateOnPLC(vars[key][1]));
                        break;
                    } //L3=L2 (new PLCcommand)
                    case (3): {
                        toAdd.push(__assign(__assign({}, vars[key][2]), { type: 'DB_REF' }));
                        break;
                    } //L1=L3
                    case (4): {
                        doDelete.push(vars[key][0]);
                        break;
                    } //delete L1
                    case (5): {
                        commands.push(resolverUtil_1["default"].generatePaczkaCommandToDeleteFromPLC(vars[key][2]));
                        break;
                    } //delete L3 (new PLCcommand)
                    case (6): {
                        doDelete.push(vars[key][1]);
                        break;
                    } //delete L2
                    case (7): {
                        break;
                    } //stable
                }
                return [2 /*return*/];
            });
        }); });
        return ({ doDelete: doDelete, toAdd: toAdd, commands: commands });
    };
    PaczkaResolver.prototype.enforceFieldLevelConsistancy = function (vars) {
        var toReturn = { toModify: [], commands: [] };
        Object.keys(vars).map(function (key) {
            if (vars[key][0] != null && vars[key][1] != null && vars[key][2] != null) { //must be stable
                var iterable = {
                    name: '',
                    lPaczek: 0,
                    nrPaczki: 0,
                    nrSeryjny1: 0,
                    nrSeryjny2: 0,
                    nrSeryjny3: 0,
                    plcId: 0
                };
                var temp1 = resolverUtil_2["default"].paczkaDeepCopy(vars[key][0]);
                var temp2 = resolverUtil_2["default"].paczkaDeepCopy(vars[key][1]);
                var temp3 = resolverUtil_2["default"].paczkaDeepCopy(vars[key][2]);
                var currentTripple = [temp1, temp2, temp3];
                Object.keys(iterable).map(function (fieldKey) {
                    var _a, _b, _c, _d, _e, _f;
                    var L1 = (vars[key][0][fieldKey] == null || vars[key][0][fieldKey] == '') ? ("0") : ((_b = (_a = vars[key][0][fieldKey]) === null || _a === void 0 ? void 0 : _a.toString()) === null || _b === void 0 ? void 0 : _b.substring(0, 15));
                    var L2 = (vars[key][1][fieldKey] == null || vars[key][1][fieldKey] == '') ? ("0") : ((_d = (_c = vars[key][1][fieldKey]) === null || _c === void 0 ? void 0 : _c.toString()) === null || _d === void 0 ? void 0 : _d.substring(0, 15));
                    var L3 = (vars[key][2][fieldKey] == null || vars[key][2][fieldKey] == '') ? ("0") : ((_f = (_e = vars[key][2][fieldKey]) === null || _e === void 0 ? void 0 : _e.toString()) === null || _f === void 0 ? void 0 : _f.substring(0, 15));
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
                            console.log('ABC -> B=C ');
                            //currentTripple[0][fieldKey]=currentTripple[1][fieldKey];
                            currentTripple[1][fieldKey] = currentTripple[2][fieldKey];
                        }
                    }
                });
                if (!resolverUtil_1["default"].comparePaczkas(vars[key][0], currentTripple[0])) {
                    toReturn.toModify.push(currentTripple[0]);
                }
                if (!resolverUtil_1["default"].comparePaczkas(vars[key][1], currentTripple[1])) {
                    toReturn.toModify.push(currentTripple[1]);
                }
                if (!resolverUtil_1["default"].comparePaczkas(vars[key][2], currentTripple[2])) {
                    //console.log('got here!');
                    toReturn.commands.push(resolverUtil_1["default"].generatePaczkaCommandToModifyOnPLC(currentTripple[2]));
                }
            }
        });
        return toReturn;
    };
    PaczkaResolver.prototype.commitChanges = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var localDelete, e_3, localAdd, e_4;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    localDelete = [];
                                    this.toDelete.forEach(function (toDelete) {
                                        localDelete.push(toDelete._id);
                                    });
                                    if (!(localDelete.length > 0)) return [3 /*break*/, 4];
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, paczka_1["default"].deleteMany({ _id: { $in: localDelete } })];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_3 = _a.sent();
                                    console.log(e_3);
                                    return [3 /*break*/, 4];
                                case 4:
                                    localAdd = [];
                                    this.toAdd.forEach(function (toAdd) {
                                        delete toAdd._id;
                                        localAdd.push(new paczka_1["default"](__assign({}, toAdd)));
                                    });
                                    if (!(localAdd.length > 0)) return [3 /*break*/, 8];
                                    _a.label = 5;
                                case 5:
                                    _a.trys.push([5, 7, , 8]);
                                    return [4 /*yield*/, paczka_1["default"].insertMany(localAdd)];
                                case 6:
                                    _a.sent();
                                    return [3 /*break*/, 8];
                                case 7:
                                    e_4 = _a.sent();
                                    console.log(e_4);
                                    return [3 /*break*/, 8];
                                case 8: 
                                //modify
                                return [4 /*yield*/, Promise.all(this.toModify.map(function (toModify) { return __awaiter(_this, void 0, void 0, function () {
                                        var currentId, e_5;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    currentId = toModify._id;
                                                    delete toModify._id;
                                                    _a.label = 1;
                                                case 1:
                                                    _a.trys.push([1, 3, , 4]);
                                                    return [4 /*yield*/, paczka_1["default"].updateOne({ _id: currentId }, __assign({}, toModify))];
                                                case 2:
                                                    _a.sent();
                                                    return [3 /*break*/, 4];
                                                case 3:
                                                    e_5 = _a.sent();
                                                    console.log(e_5);
                                                    return [3 /*break*/, 4];
                                                case 4: return [2 /*return*/];
                                            }
                                        });
                                    }); })).then(function () { resolve(); })];
                                case 9:
                                    //modify
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    return PaczkaResolver;
}(OnoToOneResolver));
exports.PaczkaResolverSingleton = new PaczkaResolver();
