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
exports.ConveyorResolverSingleton = void 0;
var conveyor_1 = require("../models/conveyor");
var resolverUtil_1 = require("./resolverUtil");
var productUtil_1 = require("./productUtil");
var bufforedProduct_1 = require("../models/bufforedProduct");
var ConveyorResolver = /** @class */ (function () {
    function ConveyorResolver() {
        this.variableMap = null;
        this.LastShifterState = {};
    }
    ConveyorResolver.prototype.resolveConveyors = function (freshVariables) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var generatedConveyors, e_1, productUiResolver, paczkas, paczkasMap, artificcialBufforedproducts, retrievedBufforedProducts, diff, e_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 7, , 8]);
                                    if (this.variableMap == null)
                                        this.variableMap = this.translateVars(freshVariables);
                                    generatedConveyors = this.turnVariablesIntoConveyors(this.variableMap);
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, this.upsertConveyors(generatedConveyors)];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_1 = _a.sent();
                                    console.log(e_1);
                                    return [3 /*break*/, 4];
                                case 4:
                                    productUiResolver = new productUtil_1["default"]();
                                    return [4 /*yield*/, productUiResolver.retrievePaczkas()];
                                case 5:
                                    paczkas = _a.sent();
                                    paczkasMap = this.mapPaczkas(paczkas);
                                    artificcialBufforedproducts = this.generateBufforedProducts(paczkasMap, generatedConveyors);
                                    return [4 /*yield*/, this.retrieveBufforedProducts()];
                                case 6:
                                    retrievedBufforedProducts = _a.sent();
                                    diff = this.bufforedProductFindDiff(artificcialBufforedproducts, retrievedBufforedProducts);
                                    this.CommitbufforedProductDiff(diff);
                                    resolve();
                                    return [3 /*break*/, 8];
                                case 7:
                                    e_2 = _a.sent();
                                    reject(e_2);
                                    return [3 /*break*/, 8];
                                case 8: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ConveyorResolver.prototype.CommitbufforedProductDiff = function (diff) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var localDelete, e_3, localAdd, e_4, err_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    localDelete = [];
                                    diff.toDelete.forEach(function (toDelete) {
                                        localDelete.push(toDelete._id);
                                    });
                                    if (!(localDelete.length > 0)) return [3 /*break*/, 4];
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, bufforedProduct_1["default"].deleteMany({ _id: { $in: localDelete } })];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_3 = _a.sent();
                                    console.log(e_3);
                                    return [3 /*break*/, 4];
                                case 4:
                                    localAdd = [];
                                    diff.toAdd.forEach(function (toAdd) {
                                        delete toAdd._id;
                                        localAdd.push(new bufforedProduct_1["default"](__assign({}, toAdd)));
                                    });
                                    if (!(localAdd.length > 0)) return [3 /*break*/, 8];
                                    _a.label = 5;
                                case 5:
                                    _a.trys.push([5, 7, , 8]);
                                    return [4 /*yield*/, bufforedProduct_1["default"].insertMany(localAdd)];
                                case 6:
                                    _a.sent();
                                    return [3 /*break*/, 8];
                                case 7:
                                    e_4 = _a.sent();
                                    console.log(e_4);
                                    return [3 /*break*/, 8];
                                case 8:
                                    _a.trys.push([8, 10, , 11]);
                                    return [4 /*yield*/, bufforedProduct_1["default"].bulkWrite(diff.toModify.map(function (doc) { return ({
                                            'updateOne': {
                                                'filter': { '_id': doc._id },
                                                'update': { '$set': doc },
                                                'upsert': true
                                            }
                                        }); }))];
                                case 9:
                                    _a.sent();
                                    resolve();
                                    return [3 /*break*/, 11];
                                case 10:
                                    err_1 = _a.sent();
                                    console.log(err_1);
                                    reject(err_1);
                                    return [3 /*break*/, 11];
                                case 11: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ConveyorResolver.prototype.bufforedProductFindDiff = function (artificial, existing) {
        var _this = this;
        var toReturn = { toAdd: [], toDelete: [], toModify: [] };
        var map = {};
        __spreadArray(__spreadArray([], artificial, true), existing, true).forEach(function (produkt) {
            var _a, _b, _c;
            var s1 = produkt.series1 ? ((((_a = produkt.series1) === null || _a === void 0 ? void 0 : _a.toString()) + '*****').substring(0, 5)) : ('*****');
            var s2 = produkt.series1 ? ((((_b = produkt.series2) === null || _b === void 0 ? void 0 : _b.toString()) + '*****').substring(0, 5)) : ('*****');
            var s3 = produkt.series1 ? ((((_c = produkt.series3) === null || _c === void 0 ? void 0 : _c.toString()) + '*****').substring(0, 5)) : ('*****');
            var key = s1 + s2 + s3;
            if (!map.hasOwnProperty(key)) {
                map[key] = [null, null];
            }
            if (typeof produkt._id == 'undefined')
                map[key][0] = produkt; //inderx 0 - artificial
            else
                map[key][1] = produkt;
        });
        //artificialBufforedProducts -> dbBufforedProducts
        Object.keys(map).map(function (key) { return __awaiter(_this, void 0, void 0, function () {
            var A, B, product;
            return __generator(this, function (_a) {
                A = (map[key][0] == null) ? (0) : (1);
                B = (map[key][1] == null) ? (0) : (1);
                product = (A * 2) + (B * 1);
                //console.log(product);
                switch (product) {
                    case (0): {
                        break;
                    } //an impossible case
                    case (1): {
                        toReturn.toModify.push(__assign(__assign({}, (map[key][1]._doc)), { _id: map[key][1]._id, status: 'History' }));
                        break;
                    } //delete
                    case (2): {
                        toReturn.toAdd.push(map[key][0]);
                        console.log(map[key][0]);
                        break;
                    } //create
                    case (3): {
                        if ( //if there is any differance -> write 1bstract to DB_EDIT
                        map[key][0].name != map[key][1].name ||
                            map[key][0].series1 != map[key][1].series1 ||
                            map[key][0].series2 != map[key][1].series2 ||
                            map[key][0].series3 != map[key][1].series3 ||
                            map[key][0].count1 != map[key][1].count1 ||
                            map[key][0].count2 != map[key][1].count2 ||
                            map[key][0].count3 != map[key][1].count3 ||
                            map[key][0].plcId1 != map[key][1].plcId1 ||
                            map[key][0].plcId2 != map[key][1].plcId2 ||
                            map[key][0].plcId3 != map[key][1].plcId3 ||
                            map[key][0].buffored1 != map[key][1].buffored1 ||
                            map[key][0].buffored2 != map[key][1].buffored2 ||
                            map[key][0].buffored3 != map[key][1].buffored3 ||
                            map[key][0].delivered1 != map[key][1].delivered1 ||
                            map[key][0].delivered2 != map[key][1].delivered2 ||
                            map[key][0].delivered3 != map[key][1].delivered3 ||
                            map[key][0].status != map[key][1].status) {
                            toReturn.toModify.push(__assign(__assign({}, (map[key][0])), { _id: map[key][1]._id }));
                        }
                        break;
                    } //check and modify
                }
                return [2 /*return*/];
            });
        }); });
        return toReturn;
    };
    ConveyorResolver.prototype.retrieveBufforedProducts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var retrievedBufforedProducts, e_5;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, bufforedProduct_1["default"].find({ status: 'Current' }).exec()];
                                case 1:
                                    retrievedBufforedProducts = _a.sent();
                                    resolve(retrievedBufforedProducts);
                                    return [3 /*break*/, 3];
                                case 2:
                                    e_5 = _a.sent();
                                    reject(e_5);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ConveyorResolver.prototype.generateBufforedProducts = function (paczkas, conveyors) {
        var toReturn = [];
        var tempProductmap = {};
        conveyors.forEach(function (element) {
            var _a, _b, _c, _d;
            var plcId = element.packageId ? (element.packageId) : (0);
            var podkladyQuantity = (element.position0 ? (1) : (0))
                + (element.position1 ? (1) : (0))
                + (element.position2 ? (1) : (0))
                + (element.position3 ? (1) : (0));
            var paczka = paczkas.hasOwnProperty(plcId) ? (paczkas[plcId]) : (null);
            var series1 = paczka ? (paczka.nrSeryjny1) : ('');
            var series2 = paczka ? (paczka.nrSeryjny2) : ('');
            var series3 = paczka ? (paczka.nrSeryjny3) : ('');
            var s1 = series1 ? ((series1.toString() + '*****').substring(0, 5)) : ('*****');
            var s2 = series2 ? ((series2.toString() + '*****').substring(0, 5)) : ('*****');
            var s3 = series3 ? ((series3.toString() + '*****').substring(0, 5)) : ('*****');
            var key = s1 + s2 + s3;
            //make sure the product exists
            if (!tempProductmap.hasOwnProperty(key)) {
                var newBufforedProduct = {};
                newBufforedProduct.series1 = series1;
                newBufforedProduct.series2 = series2;
                newBufforedProduct.series3 = series3;
                //set initial 0s, tbh we only need buffored counter
                newBufforedProduct.buffored1 = 0;
                newBufforedProduct.buffored2 = 0;
                newBufforedProduct.buffored3 = 0;
                newBufforedProduct.plcId1 = 0;
                newBufforedProduct.plcId2 = 0;
                newBufforedProduct.plcId3 = 0;
                newBufforedProduct.delivered1 = 0;
                newBufforedProduct.delivered2 = 0;
                newBufforedProduct.delivered3 = 0;
                newBufforedProduct.status = 'Current';
                newBufforedProduct.name = paczka === null || paczka === void 0 ? void 0 : paczka.name;
                if (series1 != '' || series2 != '' || series3 != '')
                    tempProductmap[key] = newBufforedProduct;
            }
            //increment whatever you need
            switch ((_a = paczkas[plcId]) === null || _a === void 0 ? void 0 : _a.nrPaczki) {
                case (1): {
                    tempProductmap[key].buffored1 += podkladyQuantity;
                    tempProductmap[key].plcId1 = plcId;
                    tempProductmap[key].count1 = (_b = paczkas[plcId]) === null || _b === void 0 ? void 0 : _b.lPaczek;
                    break;
                }
                case (2): {
                    tempProductmap[key].buffored2 += podkladyQuantity;
                    tempProductmap[key].plcId2 = plcId;
                    tempProductmap[key].count2 = (_c = paczkas[plcId]) === null || _c === void 0 ? void 0 : _c.lPaczek;
                    break;
                }
                case (3): {
                    tempProductmap[key].buffored3 += podkladyQuantity;
                    tempProductmap[key].plcId3 = plcId;
                    tempProductmap[key].count3 = (_d = paczkas[plcId]) === null || _d === void 0 ? void 0 : _d.lPaczek;
                    break;
                }
            }
        });
        Object.keys(tempProductmap).forEach(function (key) {
            toReturn.push(tempProductmap[key]);
        });
        return toReturn;
    };
    ConveyorResolver.prototype.mapPaczkas = function (inputPaczkas) {
        var toReturn = {};
        inputPaczkas.forEach(function (e) {
            if (!toReturn.hasOwnProperty(e.plcId)) {
                toReturn[e.plcId] = e;
            }
        });
        return toReturn;
    };
    ConveyorResolver.prototype.translateVars = function (vars) {
        var toReturn = {};
        vars.map(function (m) {
            if (m.variableRef.name.substring(0, 4) == 'conv') {
                toReturn[m.variableRef.name] = m.variableRef;
            }
        });
        return toReturn;
    };
    ConveyorResolver.prototype.turnVariablesIntoConveyors = function (vars) {
        // console.log(Object.keys(vars));
        var _a, _b;
        var toReturn = [];
        var index = -1;
        do {
            index++;
            var numberOfPallets = (_a = vars['conveyor' + index + 'v2']) === null || _a === void 0 ? void 0 : _a.value;
            var numberOfPalletsProcessed = isNaN(Number.parseInt(numberOfPallets)) ? (0) : (Number.parseInt(numberOfPallets));
            var packageId = (_b = vars['conveyor' + index + 'v1']) === null || _b === void 0 ? void 0 : _b.value;
            var packageIdProcessed = isNaN(Number.parseInt(packageId)) ? (0) : (Number.parseInt(packageId));
            var colors = resolverUtil_1["default"].getColorsForPackageId(packageId);
            var conveyor = {
                plcId: index,
                position0: numberOfPalletsProcessed > 0,
                position1: numberOfPalletsProcessed > 1,
                position2: numberOfPalletsProcessed > 2,
                position3: numberOfPalletsProcessed > 3,
                packageId: packageIdProcessed,
                colorRegular: colors != null ? (colors.color1) : (null),
                colorClicked: colors != null ? (colors.color2) : (null)
            };
            toReturn.push(conveyor);
        } while (typeof vars['conveyor' + (index + 1) + 'v1'] != 'undefined');
        return toReturn;
    };
    ConveyorResolver.prototype.upsertConveyors = function (inputArray) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var err_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, conveyor_1["default"].bulkWrite(inputArray.map(function (doc) { return ({
                                            'updateOne': {
                                                'filter': { 'plcId': doc.plcId },
                                                'update': { '$set': doc },
                                                'upsert': true
                                            }
                                        }); }))];
                                case 1:
                                    _a.sent();
                                    resolve();
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_2 = _a.sent();
                                    console.log(err_2);
                                    reject(err_2);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    return ConveyorResolver;
}());
exports.ConveyorResolverSingleton = new ConveyorResolver();
