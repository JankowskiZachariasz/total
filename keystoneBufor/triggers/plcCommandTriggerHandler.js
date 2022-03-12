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
var plcCommandTrigger = /** @class */ (function () {
    function plcCommandTrigger() {
    }
    plcCommandTrigger.prototype.validateStatus = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var result;
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    if (!(((_a = props === null || props === void 0 ? void 0 : props.originalInput) === null || _a === void 0 ? void 0 : _a.status) == 'Success'
                                        && ((_b = props === null || props === void 0 ? void 0 : props.existingItem) === null || _b === void 0 ? void 0 : _b.status) == 'Pending')) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this.checkIfCommandExecuted(props)];
                                case 1:
                                    result = _c.sent();
                                    resolve(result);
                                    return [3 /*break*/, 3];
                                case 2:
                                    resolve(true);
                                    _c.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    plcCommandTrigger.prototype.checkIfCommandExecuted = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, _b, _c, _d;
                        var _e, _f, _g, _h;
                        return __generator(this, function (_j) {
                            switch (_j.label) {
                                case 0:
                                    _a = (_e = props === null || props === void 0 ? void 0 : props.existingItem) === null || _e === void 0 ? void 0 : _e.operation;
                                    switch (_a) {
                                        case ('Paczki_CREATE'): return [3 /*break*/, 1];
                                        case ('Paczki_UPDATE'): return [3 /*break*/, 3];
                                        case ('Paczki_DELETE'): return [3 /*break*/, 5];
                                    }
                                    return [3 /*break*/, 7];
                                case 1:
                                    _b = resolve;
                                    return [4 /*yield*/, this.checkIfRecordCreated((_f = props === null || props === void 0 ? void 0 : props.existingItem) === null || _f === void 0 ? void 0 : _f.payload, props)];
                                case 2:
                                    _b.apply(void 0, [_j.sent()]);
                                    return [3 /*break*/, 8];
                                case 3:
                                    _c = resolve;
                                    return [4 /*yield*/, this.checkIfRecordModified((_g = props === null || props === void 0 ? void 0 : props.existingItem) === null || _g === void 0 ? void 0 : _g.payload, props)];
                                case 4:
                                    _c.apply(void 0, [_j.sent()]);
                                    return [3 /*break*/, 8];
                                case 5:
                                    _d = resolve;
                                    return [4 /*yield*/, this.checkIfRecordDeleted((_h = props === null || props === void 0 ? void 0 : props.existingItem) === null || _h === void 0 ? void 0 : _h.payload, props)];
                                case 6:
                                    _d.apply(void 0, [_j.sent()]);
                                    return [3 /*break*/, 8];
                                case 7:
                                    resolve(true);
                                    return [3 /*break*/, 8];
                                case 8: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    plcCommandTrigger.prototype.checkIfRecordCreated = function (payloadToParse, props) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var payload, paczkasData;
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    payload = JSON.parse(payloadToParse);
                                    console.log(payload.enumerator);
                                    return [4 /*yield*/, props.context.executeGraphQL({
                                            context: props.context,
                                            query: "   \n                query MyQuerry($enumerator: String!, $recordType : paczkaTypeType!) {\n                    data: allPaczkas(where: { \n                      type: $recordType\n                      enumerator: $enumerator\n                    }) {\n                        id\n                    }\n                }\n                        ",
                                            variables: {
                                                enumerator: payload.enumerator,
                                                recordType: "PLC"
                                            }
                                        })];
                                case 1:
                                    paczkasData = _c.sent();
                                    if (((_b = (_a = paczkasData === null || paczkasData === void 0 ? void 0 : paczkasData.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.length) > 0) {
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
    plcCommandTrigger.prototype.checkIfRecordDeleted = function (payloadToParse, props) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var payload, paczkasData;
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    payload = JSON.parse(payloadToParse);
                                    return [4 /*yield*/, props.context.executeGraphQL({
                                            context: props.context,
                                            query: "   \n                query MyQuerry($enumerator: String!, $recordType : paczkaTypeType!) {\n                    data: allPaczkas(where: { \n                      type: $recordType\n                      enumerator: $enumerator\n                    }) {\n                        id\n                    }\n                }\n                        ",
                                            variables: {
                                                enumerator: payload.enumerator,
                                                recordType: "PLC"
                                            }
                                        })];
                                case 1:
                                    paczkasData = _c.sent();
                                    if (((_b = (_a = paczkasData === null || paczkasData === void 0 ? void 0 : paczkasData.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                                        resolve(false);
                                    }
                                    else {
                                        resolve(true);
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    plcCommandTrigger.prototype.checkIfRecordModified = function (payloadToParse, props) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var payload, paczkasData, objectToExamine;
                        var _a, _b, _c;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    payload = JSON.parse(payloadToParse);
                                    return [4 /*yield*/, props.context.executeGraphQL({
                                            context: props.context,
                                            query: "   \n                query MyQuerry($enumerator: String!, $recordType : paczkaTypeType!) {\n                    data: allPaczkas(where: { \n                      type: $recordType\n                      enumerator: $enumerator\n                    }) {\n                        name\n                        lPaczek\n                        nrPaczki\n                        nrSeryjny1\n                        nrSeryjny2\n                        nrSeryjny3\n                        plcId\n                        dlugosc\n                    }\n                }\n                        ",
                                            variables: {
                                                enumerator: payload.enumerator,
                                                recordType: "PLC"
                                            }
                                        })];
                                case 1:
                                    paczkasData = _d.sent();
                                    if (((_b = (_a = paczkasData === null || paczkasData === void 0 ? void 0 : paczkasData.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                                        objectToExamine = (_c = paczkasData === null || paczkasData === void 0 ? void 0 : paczkasData.data) === null || _c === void 0 ? void 0 : _c.data[0];
                                        console.log(objectToExamine);
                                        console.log(payload);
                                        if ((objectToExamine.name == payload.name || objectToExamine.name == (payload.name == null ? ('') : (payload.name))) &&
                                            (objectToExamine.lPaczek == payload.lPaczek || objectToExamine.lPaczek == (payload.lPaczek == null ? (0) : (payload.lPaczek))) &&
                                            (objectToExamine.nrPaczki == payload.nrPaczki || objectToExamine.nrPaczki == (payload.nrPaczki == null ? (0) : (payload.nrPaczki))) &&
                                            (objectToExamine.nrSeryjny1 == payload.nrSeryjny1 || objectToExamine.nrSeryjny1 == (payload.nrSeryjny1 == null ? (0) : (payload.nrSeryjny1))) &&
                                            (objectToExamine.nrSeryjny2 == payload.nrSeryjny2 || objectToExamine.nrSeryjny2 == (payload.nrSeryjny2 == null ? (0) : (payload.nrSeryjny2))) &&
                                            (objectToExamine.nrSeryjny3 == payload.nrSeryjny3 || objectToExamine.nrSeryjny3 == (payload.nrSeryjny3 == null ? (0) : (payload.nrSeryjny3))) &&
                                            (objectToExamine.plcId == payload.plcId || objectToExamine.plcId == (payload.plcId == null ? (0) : (payload.plcId))) &&
                                            (objectToExamine.dlugosc == payload.dlugosc || objectToExamine.dlugosc == (payload.dlugosc == null ? (0) : (payload.dlugosc))))
                                            resolve(true);
                                        else
                                            resolve(false);
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
    return plcCommandTrigger;
}());
exports["default"] = new plcCommandTrigger();
