"use strict";
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
var PaczkaTrigger = /** @class */ (function () {
    function PaczkaTrigger() {
        this.bulkSilo = [];
    }
    PaczkaTrigger.prototype.beforeTriggerHandler = function (props) {
        this.bulkSilo.push(props);
    };
    PaczkaTrigger.prototype.afterTriggerHandler = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(this.bulkSilo.length > 0)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this.executeUpdatesInBulk(props.context, this.bulkSilo)];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2:
                                    this.bulkSilo = [];
                                    resolve();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    PaczkaTrigger.prototype.fetchPLCPaczkasFromPLC = function (apolloContext, namesToFetch) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var paczkasData;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, apolloContext.executeGraphQL({
                                        context: apolloContext,
                                        query: "   query MyQuerry($namesToFetch: [String]!, $type: paczkaTypeType!) {\n                  data: allPaczkas(where: { enumerator_in: $namesToFetch, type: $type}) {\n                    id\n                    enumerator\n                    name\n                    type\n                    lPaczek\n                    nrPaczki\n                    nrSeryjny1\n                    nrSeryjny2\n                    nrSeryjny3\n                    plcId\n                    dlugosc\n                  }\n                }",
                                        variables: { namesToFetch: namesToFetch, type: 'PLC' }
                                    })];
                                case 1:
                                    paczkasData = _a.sent();
                                    resolve(paczkasData);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    PaczkaTrigger.prototype.fetchVariables = function (apolloContext, variableNamesToFetch) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var variableData;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, apolloContext.executeGraphQL({
                                        context: apolloContext,
                                        query: "   query MyQuerry($variableNamesToFetch: [String]!) {\n                  data: allVariables(\n                    where:{name_in:$variableNamesToFetch}\n                  ) {\n                    name\n                    value  \n                  }\n                }",
                                        variables: { variableNamesToFetch: variableNamesToFetch }
                                    })];
                                case 1:
                                    variableData = _a.sent();
                                    resolve(variableData);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    PaczkaTrigger.prototype.executeUpdatesInBulk = function (apolloContext, newData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var namesToFetch, variableNamesToFetch, paczkasData, retrievedPaczaks, variableData, relatedPlcVariables, incurredPaczaks, addPaczaks, deletePaczaks, modifyPaczaks, e_1, e_2, e_3;
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    console.log('variablePaczkaTriggers.ts [22]: Executing update in bulk with ' + newData.length + ' records.');
                                    namesToFetch = new Array();
                                    variableNamesToFetch = new Array();
                                    newData.forEach(function (element) {
                                        var name = element.existingItem.name.toString();
                                        name = name.substring(0, name.lastIndexOf("v"));
                                        namesToFetch.push(name);
                                        console.log(name);
                                        //all variables should be avialable
                                        for (var i = 1; i <= 8; i++) {
                                            variableNamesToFetch.push(name + "v" + i);
                                        }
                                    });
                                    return [4 /*yield*/, this.fetchPLCPaczkasFromPLC(apolloContext, namesToFetch)];
                                case 1:
                                    paczkasData = _c.sent();
                                    retrievedPaczaks = {};
                                    (_a = paczkasData === null || paczkasData === void 0 ? void 0 : paczkasData.data) === null || _a === void 0 ? void 0 : _a.data.forEach(function (retrievedElement) {
                                        retrievedPaczaks[retrievedElement.enumerator.toString()] = retrievedElement;
                                    });
                                    return [4 /*yield*/, this.fetchVariables(apolloContext, variableNamesToFetch)];
                                case 2:
                                    variableData = _c.sent();
                                    relatedPlcVariables = (_b = variableData === null || variableData === void 0 ? void 0 : variableData.data) === null || _b === void 0 ? void 0 : _b.data;
                                    incurredPaczaks = {};
                                    //build records from variables
                                    relatedPlcVariables.forEach(function (variable) {
                                        var name = variable === null || variable === void 0 ? void 0 : variable.name;
                                        var paczkaName = variable === null || variable === void 0 ? void 0 : variable.name.substring(0, variable === null || variable === void 0 ? void 0 : variable.name.lastIndexOf("v"));
                                        var whichVariable = Number.parseInt(name.substring(name.lastIndexOf("v") + 1, name.length));
                                        var value = variable === null || variable === void 0 ? void 0 : variable.value;
                                        if (!incurredPaczaks.hasOwnProperty(paczkaName)) {
                                            var newEmptyPaczka = { type: "PLC", enumerator: paczkaName };
                                            incurredPaczaks[paczkaName] = newEmptyPaczka;
                                        }
                                        switch (whichVariable) {
                                            case 1: {
                                                incurredPaczaks[paczkaName].name = value;
                                                break;
                                            }
                                            case 2: {
                                                incurredPaczaks[paczkaName].lPaczek = Number.parseInt(value);
                                                break;
                                            }
                                            case 3: {
                                                incurredPaczaks[paczkaName].nrPaczki = Number.parseInt(value);
                                                break;
                                            }
                                            case 4: {
                                                incurredPaczaks[paczkaName].nrSeryjny1 = Number.parseInt(value);
                                                break;
                                            }
                                            case 5: {
                                                incurredPaczaks[paczkaName].nrSeryjny2 = Number.parseInt(value);
                                                break;
                                            }
                                            case 6: {
                                                incurredPaczaks[paczkaName].nrSeryjny3 = Number.parseInt(value);
                                                break;
                                            }
                                            case 7: {
                                                incurredPaczaks[paczkaName].plcId = Number.parseInt(value);
                                                break;
                                            }
                                            case 8: {
                                                incurredPaczaks[paczkaName].dlugosc = Number.parseInt(value);
                                                break;
                                            }
                                        }
                                    });
                                    addPaczaks = [];
                                    deletePaczaks = [];
                                    modifyPaczaks = [];
                                    //find deltas
                                    Object.keys(incurredPaczaks).forEach(function (element) {
                                        var incurredPaczka = incurredPaczaks[element];
                                        var retrievedPaczka = retrievedPaczaks[element];
                                        console.log(incurredPaczka);
                                        console.log(retrievedPaczka);
                                        //add to db
                                        if (incurredPaczka.plcId != 0 && !retrievedPaczka) {
                                            addPaczaks.push({ data: incurredPaczka });
                                        }
                                        //delete from db
                                        else if ((incurredPaczka.plcId == 0) && retrievedPaczka != null) {
                                            deletePaczaks.push(retrievedPaczka.id);
                                            Object.keys(retrievedPaczaks).forEach(function (element) {
                                                console.log(retrievedPaczaks[element].type);
                                            });
                                        }
                                        //modified paczka
                                        else if ((incurredPaczka && retrievedPaczka)
                                            &&
                                                (retrievedPaczka.enumerator != incurredPaczka.enumerator ||
                                                    retrievedPaczka.name != incurredPaczka.name.toString() ||
                                                    retrievedPaczka.type != incurredPaczka.type.toString() ||
                                                    retrievedPaczka.lPaczek != incurredPaczka.lPaczek ||
                                                    retrievedPaczka.nrPaczki != incurredPaczka.nrPaczki ||
                                                    retrievedPaczka.nrSeryjny1 != incurredPaczka.nrSeryjny1 ||
                                                    retrievedPaczka.nrSeryjny2 != incurredPaczka.nrSeryjny2 ||
                                                    retrievedPaczka.nrSeryjny3 != incurredPaczka.nrSeryjny3 ||
                                                    retrievedPaczka.plcId != incurredPaczka.plcId ||
                                                    retrievedPaczka.dlugosc != incurredPaczka.dlugosc)) {
                                            modifyPaczaks.push({ data: incurredPaczka, id: retrievedPaczka.id });
                                        }
                                    });
                                    console.log('addPaczaks');
                                    console.log(addPaczaks);
                                    console.log('deletePaczaks');
                                    console.log(deletePaczaks);
                                    console.log('modifyPaczaks');
                                    console.log(modifyPaczaks);
                                    _c.label = 3;
                                case 3:
                                    _c.trys.push([3, 5, , 6]);
                                    return [4 /*yield*/, this.createPaczkas(addPaczaks, apolloContext)];
                                case 4:
                                    _c.sent();
                                    return [3 /*break*/, 6];
                                case 5:
                                    e_1 = _c.sent();
                                    console.log(e_1);
                                    return [3 /*break*/, 6];
                                case 6:
                                    console.log('11111s');
                                    _c.label = 7;
                                case 7:
                                    _c.trys.push([7, 9, , 10]);
                                    return [4 /*yield*/, this.deletePaczkas(deletePaczaks, apolloContext)];
                                case 8:
                                    _c.sent();
                                    return [3 /*break*/, 10];
                                case 9:
                                    e_2 = _c.sent();
                                    console.log(e_2);
                                    return [3 /*break*/, 10];
                                case 10:
                                    console.log('222222s');
                                    _c.label = 11;
                                case 11:
                                    _c.trys.push([11, 13, , 14]);
                                    return [4 /*yield*/, this.updatePaczkas(modifyPaczaks, apolloContext)];
                                case 12:
                                    _c.sent();
                                    return [3 /*break*/, 14];
                                case 13:
                                    e_3 = _c.sent();
                                    console.log(e_3);
                                    return [3 /*break*/, 14];
                                case 14:
                                    console.log('333333s');
                                    resolve();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    PaczkaTrigger.prototype.createPaczkas = function (paczaks, apolloContext) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!((paczaks === null || paczaks === void 0 ? void 0 : paczaks.length) > 0)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, apolloContext.executeGraphQL({
                                            context: apolloContext,
                                            query: "   mutation MyMutation($newPaczaks: [PaczkasCreateInput]!){\n                    createPaczkas( data: $newPaczaks){id}\n                }",
                                            variables: { newPaczaks: paczaks }
                                        })];
                                case 1:
                                    result = _a.sent();
                                    if (result.errors) {
                                        reject(result.errors);
                                    }
                                    resolve();
                                    return [3 /*break*/, 3];
                                case 2:
                                    resolve();
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    PaczkaTrigger.prototype.deletePaczkas = function (paczaks, apolloContext) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!((paczaks === null || paczaks === void 0 ? void 0 : paczaks.length) > 0)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, apolloContext.executeGraphQL({
                                            context: apolloContext,
                                            query: "   mutation MyMutation($ids: [ID!]){\n                    deletePaczkas(\n                    ids: $ids\n                    ){id}\n                }",
                                            variables: { ids: paczaks }
                                        })];
                                case 1:
                                    result = _a.sent();
                                    if (result.errors) {
                                        reject(result.errors);
                                    }
                                    resolve();
                                    return [3 /*break*/, 3];
                                case 2:
                                    resolve();
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    PaczkaTrigger.prototype.updatePaczkas = function (paczaks, apolloContext) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!((paczaks === null || paczaks === void 0 ? void 0 : paczaks.length) > 0)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, apolloContext.executeGraphQL({
                                            context: apolloContext,
                                            query: "   mutation MyMutation($updatedPaczaks: [PaczkasUpdateInput]!){\n                    updatePaczkas( data: $updatedPaczaks){id}\n                }",
                                            variables: { updatedPaczaks: paczaks }
                                        })];
                                case 1:
                                    result = _a.sent();
                                    if (result.errors) {
                                        reject(result.errors);
                                    }
                                    resolve();
                                    return [3 /*break*/, 3];
                                case 2:
                                    resolve();
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    return PaczkaTrigger;
}());
exports["default"] = new PaczkaTrigger();
