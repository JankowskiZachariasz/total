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
var paczka_1 = require("../models/paczka");
var products_1 = require("../models/products");
var ProductUtil = /** @class */ (function () {
    function ProductUtil() {
    }
    //beginning of teh loop >> products -> paczkas
    ProductUtil.prototype.productsToPaczkasTranslate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var untouchedProducts, artificialPaczkas, dbPaczkas, changes;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.retrieveProducts()];
                                case 1:
                                    untouchedProducts = _a.sent();
                                    artificialPaczkas = this.unpackPaczkas(untouchedProducts);
                                    return [4 /*yield*/, this.resetModifiedFlags(untouchedProducts)];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, this.retrievePaczkas()];
                                case 3:
                                    dbPaczkas = _a.sent();
                                    changes = this.resolveDiffPaczkas(dbPaczkas, artificialPaczkas);
                                    return [4 /*yield*/, this.CommitPaczkas(changes)];
                                case 4:
                                    _a.sent();
                                    resolve();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ProductUtil.prototype.retrieveProducts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var retrievedProducts, e_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, products_1["default"].find({ toDelete: { $ne: true } }).exec()];
                                case 1:
                                    retrievedProducts = _a.sent();
                                    resolve(retrievedProducts);
                                    return [3 /*break*/, 3];
                                case 2:
                                    e_1 = _a.sent();
                                    reject(e_1);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ProductUtil.prototype.unpackPaczkas = function (produkts) {
        var resolvedInexes = [];
        var notYetResolvedIndexes = [];
        var indexesUsed = [];
        produkts.map(function (m) {
            for (var pck = 0; pck < 3; pck++) {
                var currentPlcID;
                var currentLength;
                switch (pck) {
                    case (0): {
                        currentPlcID = m.plcId1;
                        currentLength = m.length1;
                        break;
                    }
                    case (1): {
                        currentPlcID = m.plcId2;
                        currentLength = m.length2;
                        break;
                    }
                    case (2): {
                        currentPlcID = m.plcId3;
                        currentLength = m.length3;
                        break;
                    }
                }
                if (currentPlcID > 0 && currentPlcID <= 1000) {
                    if (!indexesUsed.includes(currentPlcID)) {
                        resolvedInexes.push({
                            enumerator: 'paczka' + currentPlcID,
                            name: m.namePlc,
                            type: 'DB_EDIT',
                            lPaczek: m.count,
                            nrPaczki: pck + 1,
                            nrSeryjny1: m.series1,
                            nrSeryjny2: m.series2,
                            nrSeryjny3: m.series3,
                            plcId: currentPlcID,
                            dlugosc: currentLength ? (currentLength) : 0
                        });
                        indexesUsed.push(currentPlcID);
                    }
                }
                else if (currentPlcID < 0) {
                    notYetResolvedIndexes.push({
                        enumerator: 'paczka',
                        name: m.namePlc,
                        type: 'DB_EDIT',
                        lPaczek: m.count,
                        nrPaczki: pck + 1,
                        nrSeryjny1: m.series1,
                        nrSeryjny2: m.series2,
                        nrSeryjny3: m.series3,
                        plcId: null,
                        dlugosc: currentLength ? (currentLength) : 0
                    });
                }
            }
        });
        //assign indexes
        for (var i = 1; i <= 1000; i++) {
            if (!(notYetResolvedIndexes.length > 0)) {
                break;
            }
            if (!indexesUsed.includes(i)) {
                //popping time
                var toAssign = notYetResolvedIndexes.pop();
                toAssign.enumerator += i;
                toAssign.plcId = i;
                resolvedInexes.push(toAssign);
            }
        }
        return resolvedInexes;
    };
    ProductUtil.prototype.resetModifiedFlags = function (produkts) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var toModifyArray;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    toModifyArray = [];
                                    console.log(produkts.length);
                                    produkts.forEach(function (element) {
                                        if (element.wasUpdatedByClient == true) {
                                            toModifyArray.push(element._doc);
                                        }
                                    });
                                    console.log(toModifyArray.length);
                                    //modify
                                    return [4 /*yield*/, Promise.all(toModifyArray.map(function (toModify) { return __awaiter(_this, void 0, void 0, function () {
                                            var currentId, e_2;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        currentId = toModify._id;
                                                        toModify.wasUpdatedByClient = false;
                                                        delete toModify._id;
                                                        _a.label = 1;
                                                    case 1:
                                                        _a.trys.push([1, 3, , 4]);
                                                        return [4 /*yield*/, products_1["default"].updateOne({ _id: currentId }, __assign({}, toModify))];
                                                    case 2:
                                                        _a.sent();
                                                        return [3 /*break*/, 4];
                                                    case 3:
                                                        e_2 = _a.sent();
                                                        console.log(e_2);
                                                        return [3 /*break*/, 4];
                                                    case 4: return [2 /*return*/];
                                                }
                                            });
                                        }); })).then(function () { resolve(); })];
                                case 1:
                                    //modify
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ProductUtil.prototype.resolveDiffPaczkas = function (dbPaczkas, artificialPaczkas) {
        var _this = this;
        var toReturn = { toAdd: [], toDelete: [], toModify: [] };
        var map = {};
        __spreadArray(__spreadArray([], dbPaczkas, true), artificialPaczkas, true).forEach(function (paczka) {
            var currentEnum = paczka.enumerator;
            if (!map.hasOwnProperty(currentEnum))
                map[currentEnum] = [null, null];
            if (typeof paczka._id == 'undefined')
                map[currentEnum][0] = paczka;
            else
                map[currentEnum][1] = paczka;
        });
        //DB_EDIT_A -> DB_EDIT
        Object.keys(map).map(function (key) { return __awaiter(_this, void 0, void 0, function () {
            var A, B, product, modifyToAdd;
            return __generator(this, function (_a) {
                A = (map[key][0] == null) ? (0) : (1);
                B = (map[key][1] == null) ? (0) : (1);
                product = (A * 2) + (B * 1);
                switch (product) {
                    case (0): {
                        break;
                    } //an impossible case
                    case (1): {
                        toReturn.toDelete.push(map[key][1]);
                        break;
                    } //delete
                    case (2): {
                        toReturn.toAdd.push(map[key][0]);
                        break;
                    } //create
                    case (3): {
                        console.log(map[key][0].name != map[key][1].name);
                        console.log(map[key][0].lPaczek != map[key][1].lPaczek);
                        console.log(map[key][0].nrPaczki != map[key][1].nrPaczki);
                        console.log(map[key][0].nrSeryjny1 != map[key][1].nrSeryjny1);
                        console.log(map[key][0].nrSeryjny2 != map[key][1].nrSeryjny2);
                        console.log(map[key][0].nrSeryjny3 != map[key][1].nrSeryjny3);
                        console.log(map[key][0].plcId != map[key][1].plcId);
                        console.log(map[key][0].dlugosc != map[key][1].dlugosc);
                        if ( //if there is any differance -> write 1bstract to DB_EDIT
                        map[key][0].name != map[key][1].name ||
                            map[key][0].lPaczek != map[key][1].lPaczek ||
                            map[key][0].nrPaczki != map[key][1].nrPaczki ||
                            map[key][0].nrSeryjny1 != map[key][1].nrSeryjny1 ||
                            map[key][0].nrSeryjny2 != map[key][1].nrSeryjny2 ||
                            map[key][0].nrSeryjny3 != map[key][1].nrSeryjny3 ||
                            map[key][0].plcId != map[key][1].plcId ||
                            map[key][0].dlugosc != map[key][1].dlugosc) {
                            modifyToAdd = __assign(__assign({}, (map[key][0])), { _id: map[key][1]._id });
                            console.log('Modify to add: (START)');
                            console.log(modifyToAdd);
                            console.log('Modify to add: (END)');
                            toReturn.toModify.push(modifyToAdd);
                        }
                        break;
                    } //check and modify
                }
                return [2 /*return*/];
            });
        }); });
        return toReturn;
    };
    ProductUtil.prototype.CommitPaczkas = function (diff) {
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
                                    diff.toDelete.forEach(function (toDelete) {
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
                                    diff.toAdd.forEach(function (toAdd) {
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
                                    console.log(localAdd);
                                    console.log(e_4);
                                    return [3 /*break*/, 8];
                                case 8: 
                                //modify
                                return [4 /*yield*/, Promise.all(diff.toModify.map(function (toModify) { return __awaiter(_this, void 0, void 0, function () {
                                        var currentId, e_5;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    currentId = toModify._id;
                                                    delete toModify._id;
                                                    _a.label = 1;
                                                case 1:
                                                    _a.trys.push([1, 3, , 4]);
                                                    return [4 /*yield*/, paczka_1["default"].replaceOne({ _id: currentId }, toModify, function (err, doc) { console.log(doc); console.log(err); }).clone()];
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
    //tripples processed, resolved and saved to db >> paczkas -> products
    ProductUtil.prototype.updateProductsWithPaczkas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var paczkas, artifficialProdukts, untouchedProducts, changes;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.retrievePaczkas()];
                                case 1:
                                    paczkas = _a.sent();
                                    console.log('A');
                                    artifficialProdukts = this.buildProducts(paczkas);
                                    return [4 /*yield*/, this.retrieveProducts()];
                                case 2:
                                    untouchedProducts = _a.sent();
                                    console.log('B');
                                    changes = this.resolveDiffProductss(untouchedProducts, artifficialProdukts);
                                    console.log('C');
                                    return [4 /*yield*/, this.CommitProducts(changes)];
                                case 3:
                                    _a.sent();
                                    console.log('D');
                                    return [4 /*yield*/, this.deleteToDelete()];
                                case 4:
                                    _a.sent();
                                    console.log('E');
                                    resolve();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ProductUtil.prototype.retrievePaczkas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var retrievedPaczkas, e_6;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, paczka_1["default"].find({ type: 'DB_EDIT' }).exec()];
                                case 1:
                                    retrievedPaczkas = _a.sent();
                                    resolve(retrievedPaczkas);
                                    return [3 /*break*/, 3];
                                case 2:
                                    e_6 = _a.sent();
                                    reject(e_6);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    ProductUtil.prototype.buildProducts = function (paczkas) {
        var _this = this;
        var toReturn = [];
        var map = {};
        paczkas.forEach(function (element) {
            var _a, _b, _c;
            var s1 = element.nrSeryjny1 ? ((((_a = element.nrSeryjny1) === null || _a === void 0 ? void 0 : _a.toString()) + '*****').substring(0, 5)) : ('*****');
            var s2 = element.nrSeryjny2 ? ((((_b = element.nrSeryjny2) === null || _b === void 0 ? void 0 : _b.toString()) + '*****').substring(0, 5)) : ('*****');
            var s3 = element.nrSeryjny3 ? ((((_c = element.nrSeryjny3) === null || _c === void 0 ? void 0 : _c.toString()) + '*****').substring(0, 5)) : ('*****');
            var key = s1 + s2 + s3;
            if (!map.hasOwnProperty(key)) {
                map[key] = [null, null, null];
            }
            map[key][element.nrPaczki - 1] = element;
        });
        Object.keys(map).map(function (key) { return __awaiter(_this, void 0, void 0, function () {
            var a, b, c, notnullPaczka;
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            return __generator(this, function (_o) {
                a = (((_a = map[key][0]) === null || _a === void 0 ? void 0 : _a.plcId) > 0 && ((_b = map[key][0]) === null || _b === void 0 ? void 0 : _b.plcId) <= 1000) ? (1) : (0);
                b = (((_c = map[key][1]) === null || _c === void 0 ? void 0 : _c.plcId) > 0 && ((_d = map[key][1]) === null || _d === void 0 ? void 0 : _d.plcId) <= 1000) ? (1) : (0);
                c = (((_e = map[key][2]) === null || _e === void 0 ? void 0 : _e.plcId) > 0 && ((_f = map[key][2]) === null || _f === void 0 ? void 0 : _f.plcId) <= 1000) ? (1) : (0);
                notnullPaczka = map[key][0] ? (map[key][0]) : (map[key][1] ? (map[key][1]) : (map[key][2]));
                console.log('Not null paczka:');
                console.log(notnullPaczka);
                toReturn.push({
                    namePlc: notnullPaczka === null || notnullPaczka === void 0 ? void 0 : notnullPaczka.name,
                    series1: notnullPaczka === null || notnullPaczka === void 0 ? void 0 : notnullPaczka.nrSeryjny1,
                    series2: notnullPaczka === null || notnullPaczka === void 0 ? void 0 : notnullPaczka.nrSeryjny2,
                    series3: notnullPaczka === null || notnullPaczka === void 0 ? void 0 : notnullPaczka.nrSeryjny3,
                    count: a + b + c,
                    length1: (_g = map[key][0]) === null || _g === void 0 ? void 0 : _g.dlugosc,
                    length2: (_h = map[key][1]) === null || _h === void 0 ? void 0 : _h.dlugosc,
                    length3: (_j = map[key][2]) === null || _j === void 0 ? void 0 : _j.dlugosc,
                    plcId1: (_k = map[key][0]) === null || _k === void 0 ? void 0 : _k.plcId,
                    plcId2: (_l = map[key][1]) === null || _l === void 0 ? void 0 : _l.plcId,
                    plcId3: (_m = map[key][2]) === null || _m === void 0 ? void 0 : _m.plcId,
                    toDelete: false,
                    wasUpdatedByClient: false,
                    name: ''
                });
                return [2 /*return*/];
            });
        }); });
        return toReturn;
    };
    ProductUtil.prototype.resolveDiffProductss = function (dbProducts, artificialProducts) {
        var _this = this;
        var toReturn = { toAdd: [], toDelete: [], toModify: [] };
        var map = {};
        __spreadArray(__spreadArray([], dbProducts, true), artificialProducts, true).forEach(function (produkt) {
            var _a, _b, _c;
            var s1 = produkt.series1 ? ((((_a = produkt.series1) === null || _a === void 0 ? void 0 : _a.toString()) + '*****').substring(0, 5)) : ('*****');
            var s2 = produkt.series1 ? ((((_b = produkt.series2) === null || _b === void 0 ? void 0 : _b.toString()) + '*****').substring(0, 5)) : ('*****');
            var s3 = produkt.series1 ? ((((_c = produkt.series3) === null || _c === void 0 ? void 0 : _c.toString()) + '*****').substring(0, 5)) : ('*****');
            var key = s1 + s2 + s3;
            if (!map.hasOwnProperty(key)) {
                map[key] = [null, null];
            }
            if (typeof produkt._id == 'undefined')
                map[key][0] = produkt;
            else
                map[key][1] = produkt;
        });
        //artificialProducts -> dbProducts
        Object.keys(map).map(function (key) { return __awaiter(_this, void 0, void 0, function () {
            var A, B, product;
            return __generator(this, function (_a) {
                A = (map[key][0] == null) ? (0) : (1);
                B = (map[key][1] == null) ? (0) : (1);
                product = (A * 2) + (B * 1);
                console.log(product);
                switch (product) {
                    case (0): {
                        break;
                    } //an impossible case
                    case (1): {
                        toReturn.toModify.push(__assign(__assign({}, (map[key][1]._doc)), { _id: map[key][1]._id, plcId1: null, plcId2: null, plcId3: null, length1: null, length2: null, length3: null }));
                        break;
                    } //delete
                    case (2): {
                        toReturn.toAdd.push(map[key][0]);
                        console.log(map[key][0]);
                        break;
                    } //create
                    case (3): {
                        if ( //if there is any differance -> write 1bstract to DB_EDIT
                        map[key][0].namePlc != map[key][1].namePlc ||
                            map[key][0].series1 != map[key][1].series1 ||
                            map[key][0].series2 != map[key][1].series2 ||
                            map[key][0].series3 != map[key][1].series3 ||
                            map[key][0].count != map[key][1].count ||
                            map[key][0].length1 != map[key][1].length1 ||
                            map[key][0].length2 != map[key][1].length2 ||
                            map[key][0].length3 != map[key][1].length3 ||
                            map[key][0].plcId1 != map[key][1].plcId1 ||
                            map[key][0].plcId2 != map[key][1].plcId2 ||
                            map[key][0].plcId3 != map[key][1].plcId3) {
                            if (map[key][1].wasUpdatedByClient != true)
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
    ProductUtil.prototype.CommitProducts = function (diff) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var localDelete, e_7, localAdd, e_8;
                        var _this = this;
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
                                    return [4 /*yield*/, products_1["default"].deleteMany({ _id: { $in: localDelete } })];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_7 = _a.sent();
                                    console.log(e_7);
                                    return [3 /*break*/, 4];
                                case 4:
                                    localAdd = [];
                                    diff.toAdd.forEach(function (toAdd) {
                                        delete toAdd._id;
                                        localAdd.push(new products_1["default"](__assign({}, toAdd)));
                                    });
                                    if (!(localAdd.length > 0)) return [3 /*break*/, 8];
                                    _a.label = 5;
                                case 5:
                                    _a.trys.push([5, 7, , 8]);
                                    return [4 /*yield*/, products_1["default"].insertMany(localAdd)];
                                case 6:
                                    _a.sent();
                                    return [3 /*break*/, 8];
                                case 7:
                                    e_8 = _a.sent();
                                    console.log(e_8);
                                    return [3 /*break*/, 8];
                                case 8: 
                                //modify
                                return [4 /*yield*/, Promise.all(diff.toModify.map(function (toModify) { return __awaiter(_this, void 0, void 0, function () {
                                        var currentId, e_9;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    currentId = toModify._id;
                                                    delete toModify._id;
                                                    console.log('modifying');
                                                    console.log(toModify);
                                                    _a.label = 1;
                                                case 1:
                                                    _a.trys.push([1, 3, , 4]);
                                                    return [4 /*yield*/, products_1["default"].replaceOne({ _id: currentId }, toModify, function (err, doc) { console.log(doc); console.log(err); }).clone()];
                                                case 2:
                                                    _a.sent();
                                                    return [3 /*break*/, 4];
                                                case 3:
                                                    e_9 = _a.sent();
                                                    console.log(e_9);
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
    ProductUtil.prototype.deleteToDelete = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var localDelete, retrievedProducts, e_10;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    localDelete = [];
                                    return [4 /*yield*/, products_1["default"].find({ toDelete: true }).exec()];
                                case 1:
                                    retrievedProducts = _a.sent();
                                    retrievedProducts.forEach(function (toDelete) {
                                        localDelete.push(toDelete._id);
                                    });
                                    if (!(localDelete.length > 0)) return [3 /*break*/, 6];
                                    _a.label = 2;
                                case 2:
                                    _a.trys.push([2, 4, , 5]);
                                    return [4 /*yield*/, paczka_1["default"].deleteMany({ _id: { $in: localDelete } })];
                                case 3:
                                    _a.sent();
                                    resolve();
                                    return [3 /*break*/, 5];
                                case 4:
                                    e_10 = _a.sent();
                                    console.log(e_10);
                                    return [3 /*break*/, 5];
                                case 5: return [3 /*break*/, 7];
                                case 6:
                                    resolve();
                                    _a.label = 7;
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    return ProductUtil;
}());
exports["default"] = ProductUtil;
