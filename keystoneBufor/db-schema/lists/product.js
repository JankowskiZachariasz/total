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
var fields_1 = require("@keystonejs/fields");
var productSchema = {
    fields: {
        namePlc: { type: fields_1.Text, isRequired: false },
        series1: { type: fields_1.Integer, isRequired: false },
        series2: { type: fields_1.Integer, isRequired: false },
        series3: { type: fields_1.Integer, isRequired: false },
        count: { type: fields_1.Integer, isRequired: false },
        length1: { type: fields_1.Integer, isRequired: false },
        length2: { type: fields_1.Integer, isRequired: false },
        length3: { type: fields_1.Integer, isRequired: false },
        plcId1: { type: fields_1.Integer, isRequired: false },
        plcId2: { type: fields_1.Integer, isRequired: false },
        plcId3: { type: fields_1.Integer, isRequired: false },
        toDelete: { type: fields_1.Checkbox, isRequired: false },
        wasUpdatedByClient: { type: fields_1.Checkbox, isRequired: false },
        name: { type: fields_1.Text, isRequired: false }
    },
    labelField: "namePlc",
    adminConfig: {
        defaultColumns: ' name , series1'
    },
    access: {
        create: function (props) { return props.authentication.item.isAdmin; },
        read: function (props) { return props.authentication.item.id != null; },
        update: function (props) { return props.authentication.item.isAdmin; },
        "delete": function (props) { return props.authentication.item.isAdmin; }
    },
    hooks: {
        resolveInput: function (props) {
            return new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
                var paczkasData, nextFreeIndex, usedIds, i, newPaczkasCount, assambledObject;
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                return __generator(this, function (_o) {
                    switch (_o.label) {
                        case 0:
                            if (!props.originalInput.wasUpdatedByClient) return [3 /*break*/, 2];
                            return [4 /*yield*/, props.context.executeGraphQL({
                                    context: props.context,
                                    query: "   \n                    query MyQuerry($recordType : paczkaTypeType!) {\n                        data: allPaczkas(where: { \n                          type: $recordType\n                        }) {\n                            enumerator\n                        }\n                    }\n                            ",
                                    variables: { recordType: 'DB_EDIT' }
                                })];
                        case 1:
                            paczkasData = _o.sent();
                            nextFreeIndex = -1;
                            usedIds = [];
                            paczkasData.data.data.forEach(function (element) {
                                var currentId = Number.parseInt(element.enumerator.substring(6));
                                usedIds.push(currentId);
                            });
                            for (i = 1; i < 1000; i++) {
                                if (!usedIds.includes(i)) {
                                    nextFreeIndex = -i;
                                    break;
                                }
                            }
                            if (props.originalInput.hasOwnProperty('plcId1') && props.resolvedData.plcId1 != null)
                                props.resolvedData.plcId1 = nextFreeIndex--;
                            if (props.originalInput.hasOwnProperty('plcId2') && props.resolvedData.plcId2 != null)
                                props.resolvedData.plcId2 = nextFreeIndex--;
                            if (props.originalInput.hasOwnProperty('plcId3') && props.resolvedData.plcId3 != null)
                                props.resolvedData.plcId3 = nextFreeIndex--;
                            _o.label = 2;
                        case 2:
                            newPaczkasCount = 0;
                            assambledObject = __assign(__assign({}, props.existingItem), props.resolvedData);
                            if (assambledObject.plcId1 ? (true) : (false))
                                newPaczkasCount++;
                            if (assambledObject.plcId2 ? (true) : (false))
                                newPaczkasCount++;
                            if (assambledObject.plcId3 ? (true) : (false))
                                newPaczkasCount++;
                            props.resolvedData.count = newPaczkasCount;
                            //no null series
                            props.resolvedData.series1 = assambledObject.series1 ? (assambledObject.series1 > 32767 ? (32767) : (assambledObject.series1 < 0 ? (0) : (assambledObject.series1))) : (0);
                            props.resolvedData.series2 = assambledObject.series2 ? (assambledObject.series2 > 32767 ? (32767) : (assambledObject.series2 < 0 ? (0) : (assambledObject.series2))) : (0);
                            props.resolvedData.series3 = assambledObject.series3 ? (assambledObject.series3 > 32767 ? (32767) : (assambledObject.series3 < 0 ? (0) : (assambledObject.series3))) : (0);
                            //populate tags
                            props.resolvedData.name = ((_b = (_a = props.resolvedData) === null || _a === void 0 ? void 0 : _a.series1) === null || _b === void 0 ? void 0 : _b.toString()) + ((_d = (_c = props.resolvedData) === null || _c === void 0 ? void 0 : _c.series2) === null || _d === void 0 ? void 0 : _d.toString()) + ((_f = (_e = props.resolvedData) === null || _e === void 0 ? void 0 : _e.series3) === null || _f === void 0 ? void 0 : _f.toString());
                            props.resolvedData.name += ' ' + ((_g = props.resolvedData) === null || _g === void 0 ? void 0 : _g.series1) + '-' + ((_h = props.resolvedData) === null || _h === void 0 ? void 0 : _h.series2) + '-' + ((_j = props.resolvedData) === null || _j === void 0 ? void 0 : _j.series3); //hyphens
                            props.resolvedData.name += ' ' + ((_k = props.resolvedData) === null || _k === void 0 ? void 0 : _k.series1) + ' ' + ((_l = props.resolvedData) === null || _l === void 0 ? void 0 : _l.series2) + ' ' + ((_m = props.resolvedData) === null || _m === void 0 ? void 0 : _m.series3); //spaces
                            props.resolvedData.name += ' ' + (assambledObject === null || assambledObject === void 0 ? void 0 : assambledObject.namePlc);
                            //enforce variable limits
                            props.resolvedData.length1 = assambledObject.length1 > 32767 ? (32767) : (assambledObject.length1 < 0 ? (0) : (assambledObject.length1));
                            props.resolvedData.length2 = assambledObject.length2 > 32767 ? (32767) : (assambledObject.length2 < 0 ? (0) : (assambledObject.length2));
                            props.resolvedData.length3 = assambledObject.length3 > 32767 ? (32767) : (assambledObject.length3 < 0 ? (0) : (assambledObject.length3));
                            resolve(props.resolvedData);
                            return [2 /*return*/];
                    }
                });
            }); });
        },
        validateInput: function (props) {
            return new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
                var assambledObject, variables, duplicates;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            assambledObject = __assign(__assign({}, (props.existingItem)), (props.resolvedData));
                            variables = {
                                series1: assambledObject.series1 ? (assambledObject.series1) : (0),
                                series2: assambledObject.series2 ? (assambledObject.series2) : (0),
                                series3: assambledObject.series3 ? (assambledObject.series3) : (0),
                                id: (assambledObject === null || assambledObject === void 0 ? void 0 : assambledObject.id) ? (assambledObject === null || assambledObject === void 0 ? void 0 : assambledObject.id) : ('')
                            };
                            return [4 /*yield*/, props.context.executeGraphQL({
                                    context: props.context,
                                    query: "   \n                query MyQuerry($series1:Int!,$series2:Int!,$series3:Int!,$id:ID!){\n                    data: allProducts(\n                      where:{\n                        series1:$series1,\n                        series2:$series2,\n                        series3:$series3,\n                        id_not:$id,\n                        toDelete_not:true\n                      }\n                    ){id}\n                  }               \n                        ",
                                    variables: variables
                                })];
                        case 1:
                            duplicates = _c.sent();
                            if (((_b = (_a = duplicates === null || duplicates === void 0 ? void 0 : duplicates.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.length) > 0 && assambledObject.toDelete != true) {
                                console.log('Detected Duplicates');
                                reject('detected a duplicate');
                            }
                            else
                                resolve();
                            return [2 /*return*/];
                    }
                });
            }); });
        }
    }
};
exports["default"] = productSchema;
