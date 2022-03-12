"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
var variable_1 = require("../models/variable");
var datablock_1 = require("../models/datablock");
var operationsPLC_1 = require("../models/operationsPLC");
var apollo_client_1 = require("../apollo-client");
var client_1 = require("@apollo/client");
var onoToOneResolver_1 = require("./onoToOneResolver");
var productUtil_1 = require("./productUtil");
var nodes7 = require("nodes7");
var loadedTestData = false;
//constants
var API_default = {
    v1: 0,
    v2: 0,
    //paczka
    v3: '',
    v4: 0,
    v5: 0,
    v6: 0,
    v7: 0,
    v8: 0,
    v9: 0,
    v10: 0,
    //produkt
    v11: '',
    v12: 0,
    v13: 0,
    v14: 0,
    v15: 0,
    v16: 0
};
var Syncer = /** @class */ (function () {
    function Syncer() {
        this.PLCs = [];
        this.connections = [];
        this.datablocks = [];
        this.pendingOperations = [];
    }
    Syncer.prototype.generateConnectionAddress = function (retrievedVariable, retrievedDatablock) {
        var _a, _b, _c, _d;
        var connectionString = "DB";
        connectionString += (_a = retrievedDatablock === null || retrievedDatablock === void 0 ? void 0 : retrievedDatablock.dbNumber) === null || _a === void 0 ? void 0 : _a.toString();
        connectionString += ",";
        connectionString += (_b = retrievedVariable === null || retrievedVariable === void 0 ? void 0 : retrievedVariable.type) === null || _b === void 0 ? void 0 : _b.toString();
        connectionString += (_c = retrievedVariable === null || retrievedVariable === void 0 ? void 0 : retrievedVariable.offset) === null || _c === void 0 ? void 0 : _c.toString();
        if (retrievedVariable.type == "S" ||
            retrievedVariable.type == "X") {
            connectionString += ".";
            connectionString += (_d = retrievedVariable === null || retrievedVariable === void 0 ? void 0 : retrievedVariable.offsetDecimal) === null || _d === void 0 ? void 0 : _d.toString();
        }
        return connectionString;
    };
    Syncer.prototype.generateVariables = function (localVariables) {
        var toReturn = {};
        localVariables.map(function (localVar) {
            toReturn[localVar.variableRef.name] = localVar.connectionAddress;
        });
        return toReturn;
    };
    Syncer.prototype.retrieveVariablesToSync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var ipAddresses = [];
                        var newPLCs = [];
                        datablock_1["default"].find({}).exec(function (err, retrievedDatablocks) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (err)
                                            reject();
                                        console.log(retrievedDatablocks);
                                        this.datablocks = retrievedDatablocks;
                                        return [4 /*yield*/, Promise.all(retrievedDatablocks.map(function (datablockInstance) { return __awaiter(_this, void 0, void 0, function () {
                                                var _this = this;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            if (!ipAddresses.includes(datablockInstance.ip)) {
                                                                ipAddresses.push(datablockInstance.ip);
                                                                newPLCs.push({
                                                                    ip: datablockInstance.ip,
                                                                    variablesToReadWrite: new Array(),
                                                                    variablesToReadOnly: new Array()
                                                                });
                                                            }
                                                            //now the current PLC is already in the PLCs array
                                                            return [4 /*yield*/, Promise.all(newPLCs.map(function (plc) { return __awaiter(_this, void 0, void 0, function () {
                                                                    var retrievedVariables, err_1;
                                                                    var _this = this;
                                                                    return __generator(this, function (_a) {
                                                                        switch (_a.label) {
                                                                            case 0:
                                                                                if (!(plc.ip == datablockInstance.ip)) return [3 /*break*/, 4];
                                                                                _a.label = 1;
                                                                            case 1:
                                                                                _a.trys.push([1, 3, , 4]);
                                                                                return [4 /*yield*/, variable_1["default"]
                                                                                        .find({ datablock: datablockInstance._id })
                                                                                        .exec()];
                                                                            case 2:
                                                                                retrievedVariables = _a.sent();
                                                                                retrievedVariables.map(function (variableInstance) {
                                                                                    var localVariable = {
                                                                                        variableRef: variableInstance,
                                                                                        connectionAddress: _this.generateConnectionAddress(variableInstance, datablockInstance)
                                                                                    };
                                                                                    if (variableInstance.rwMode == "Read") {
                                                                                        plc.variablesToReadOnly.push(localVariable);
                                                                                    }
                                                                                    else {
                                                                                        plc.variablesToReadWrite.push(localVariable);
                                                                                    }
                                                                                });
                                                                                return [3 /*break*/, 4];
                                                                            case 3:
                                                                                err_1 = _a.sent();
                                                                                console.log(err_1);
                                                                                reject();
                                                                                return [3 /*break*/, 4];
                                                                            case 4: return [2 /*return*/];
                                                                        }
                                                                    });
                                                                }); }))];
                                                        case 1:
                                                            //now the current PLC is already in the PLCs array
                                                            _a.sent();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); }))];
                                    case 1:
                                        _a.sent();
                                        this.PLCs = newPLCs;
                                        resolve(newPLCs);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    })];
            });
        });
    };
    Syncer.prototype.buildConnections = function (newPLCs) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var connectionsTemp;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    connectionsTemp = [];
                                    return [4 /*yield*/, Promise.all(newPLCs.map(function (plc) { return __awaiter(_this, void 0, void 0, function () {
                                            var conn;
                                            var _this = this;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        conn = new nodes7();
                                                        return [4 /*yield*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                                                var _this = this;
                                                                return __generator(this, function (_a) {
                                                                    conn.initiateConnection({ port: 102, host: plc.ip, rack: 0, slot: 1 }, function (err) {
                                                                        if (typeof err !== "undefined") {
                                                                            console.log(err);
                                                                            reject();
                                                                        }
                                                                        else {
                                                                            var inputVariables = [];
                                                                            inputVariables.push.apply(inputVariables, plc.variablesToReadOnly);
                                                                            inputVariables.push.apply(inputVariables, plc.variablesToReadWrite);
                                                                            var variables = _this.generateVariables(inputVariables);
                                                                            conn.setTranslationCB(function (tag) {
                                                                                return variables[tag];
                                                                            }); // This sets the "translation" to allow us to work with object names
                                                                            conn.addItems(__spreadArray([], Object.getOwnPropertyNames(variables), true));
                                                                            var localConnection = {
                                                                                plc: plc,
                                                                                plcConnection: conn
                                                                            };
                                                                            connectionsTemp.push(localConnection);
                                                                        }
                                                                        resolve();
                                                                    });
                                                                    return [2 /*return*/];
                                                                });
                                                            }); })];
                                                    case 1:
                                                        _a.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); }))];
                                case 1:
                                    _a.sent();
                                    this.connections = connectionsTemp;
                                    resolve(connectionsTemp);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Syncer.prototype.tick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, currentConnection, currentOperation, e_1, variablesToUpdate, productUiResolver;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.connections.length)) return [3 /*break*/, 15];
                        currentConnection = this.connections[i];
                        return [4 /*yield*/, this.translatePlcCommandsToWritables(currentConnection)];
                    case 2:
                        currentOperation = _a.sent();
                        if (!currentOperation) return [3 /*break*/, 6];
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.write(currentConnection)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 6];
                    case 6: return [4 /*yield*/, this.read(currentConnection)];
                    case 7:
                        variablesToUpdate = _a.sent();
                        productUiResolver = new productUtil_1["default"]();
                        console.log('MAYBE HERE?');
                        return [4 /*yield*/, productUiResolver.productsToPaczkasTranslate()];
                    case 8:
                        _a.sent();
                        //paczki: (onoToOneResolver)
                        return [4 /*yield*/, onoToOneResolver_1.PaczkaResolverSingleton.resolve(currentConnection.plc.variablesToReadOnly)];
                    case 9:
                        //paczki: (onoToOneResolver)
                        _a.sent();
                        return [4 /*yield*/, onoToOneResolver_1.PaczkaResolverSingleton.commitChanges()];
                    case 10:
                        _a.sent();
                        console.log('is it here?');
                        return [4 /*yield*/, productUiResolver.updateProductsWithPaczkas()];
                    case 11:
                        _a.sent();
                        console.log('MAYBE HERE2?');
                        // loadedTestData=true;
                        // if(!loadedTestData){
                        //   var localAdd: Array<any> = [];
                        //   for(var i=4;i<997;i++){
                        //     localAdd.push(
                        //       new paczka({type:'DB_EDIT',name:'Zachi_paczka_'+i,enumerator:('paczka'+i),nrSeryjny1:23,nrSeryjny2:i,nrSeryjny3:2000-i,nrPaczki:1,plcId:i})
                        //       );
                        //   }
                        //   if(localAdd.length>0)
                        //   try{await paczka.insertMany(localAdd)}catch(e){console.log(e);}
                        // }
                        //try to declare operation a success (triggers will either confirm it or not)
                        return [4 /*yield*/, this.operationProcessor(this.pendingOperations, onoToOneResolver_1.PaczkaResolverSingleton.PLCcommands)];
                    case 12:
                        // loadedTestData=true;
                        // if(!loadedTestData){
                        //   var localAdd: Array<any> = [];
                        //   for(var i=4;i<997;i++){
                        //     localAdd.push(
                        //       new paczka({type:'DB_EDIT',name:'Zachi_paczka_'+i,enumerator:('paczka'+i),nrSeryjny1:23,nrSeryjny2:i,nrSeryjny3:2000-i,nrPaczki:1,plcId:i})
                        //       );
                        //   }
                        //   if(localAdd.length>0)
                        //   try{await paczka.insertMany(localAdd)}catch(e){console.log(e);}
                        // }
                        //try to declare operation a success (triggers will either confirm it or not)
                        _a.sent();
                        if (!variablesToUpdate) return [3 /*break*/, 14];
                        return [4 /*yield*/, this.updateDatabase(currentConnection, variablesToUpdate)];
                    case 13:
                        _a.sent();
                        _a.label = 14;
                    case 14:
                        i++;
                        return [3 /*break*/, 1];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    Syncer.prototype.translatePlcCommandsToWritables = function (currentConnection) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            operationsPLC_1["default"].find({ status: 'Pending' }).exec(function (err, retrievedOperations) { return __awaiter(_this, void 0, void 0, function () {
                                var consideredDatablockIds, oldest, oldestOperation, API_commands;
                                var _a, _b, _c;
                                return __generator(this, function (_d) {
                                    if (err)
                                        reject(err);
                                    this.pendingOperations = retrievedOperations;
                                    consideredDatablockIds = [];
                                    this.datablocks.forEach(function (datablock) {
                                        if (datablock.ip == currentConnection.plc.ip)
                                            consideredDatablockIds.push(datablock._id.toString());
                                    });
                                    oldest = new Date(8640000000000000);
                                    oldestOperation = null;
                                    retrievedOperations.forEach(function (operation) {
                                        var candidateOldest = new Date(operation.timeSubmitted);
                                        if (candidateOldest < oldest && consideredDatablockIds.includes(operation.datablock._id.toString())) {
                                            oldest = candidateOldest;
                                            oldestOperation = operation;
                                        }
                                    });
                                    API_commands = {};
                                    Object.assign(API_commands, API_default);
                                    //modify the variables according to the current operation
                                    if (oldestOperation != null) {
                                        switch (oldestOperation.operation) {
                                            case ('Paczki_CREATE'): {
                                                API_commands = Paczki_CREATE.generateVariables(oldestOperation);
                                                break;
                                            }
                                            case ('Paczki_UPDATE'):
                                                API_commands = Paczki_UPDATE.generateVariables(oldestOperation);
                                                {
                                                    break;
                                                }
                                            case ('Paczki_DELETE'):
                                                API_commands = Paczki_DELETE.generateVariables(oldestOperation);
                                                {
                                                    break;
                                                }
                                            default: {
                                                break;
                                            }
                                        }
                                    }
                                    //writing to PLC variables
                                    if (((_b = (_a = currentConnection === null || currentConnection === void 0 ? void 0 : currentConnection.plc) === null || _a === void 0 ? void 0 : _a.variablesToReadWrite) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                                        (_c = currentConnection === null || currentConnection === void 0 ? void 0 : currentConnection.plc) === null || _c === void 0 ? void 0 : _c.variablesToReadWrite.forEach(function (PLCvar) {
                                            var _a;
                                            var varName = (_a = PLCvar === null || PLCvar === void 0 ? void 0 : PLCvar.variableRef) === null || _a === void 0 ? void 0 : _a.name;
                                            var group = varName.substring(0, varName.lastIndexOf('v'));
                                            var specifics = varName.substring(varName.lastIndexOf('v'), varName.length);
                                            switch (group) {
                                                case ('api1'): {
                                                    if (API_commands.hasOwnProperty(specifics)) {
                                                        PLCvar.variableRef.valueToWrite = API_commands[specifics];
                                                    }
                                                    break;
                                                }
                                                //case('other'):{break;}
                                            }
                                        });
                                    }
                                    //returning operation for further usage
                                    resolve(oldestOperation);
                                    return [2 /*return*/];
                                });
                            }); });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    Syncer.prototype.write = function (connection) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var variableNames, variableValues;
                        var _this = this;
                        var _a, _b;
                        return __generator(this, function (_c) {
                            variableNames = new Array();
                            variableValues = new Array();
                            (_b = (_a = connection === null || connection === void 0 ? void 0 : connection.plc) === null || _a === void 0 ? void 0 : _a.variablesToReadWrite) === null || _b === void 0 ? void 0 : _b.map(function (m) {
                                var _a, _b;
                                var name = (_a = m === null || m === void 0 ? void 0 : m.variableRef) === null || _a === void 0 ? void 0 : _a.name;
                                var valueToWrite = (_b = m === null || m === void 0 ? void 0 : m.variableRef) === null || _b === void 0 ? void 0 : _b.valueToWrite;
                                if (name && valueToWrite) {
                                    variableNames.push(name);
                                    variableValues.push(valueToWrite);
                                }
                            });
                            try {
                                connection.plcConnection.writeItems(variableNames, variableValues, function (result) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                    console.log(result);
                                    resolve(result);
                                    return [2 /*return*/];
                                }); }); });
                            }
                            catch (e) {
                                console.log(e);
                                reject(e);
                            }
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    Syncer.prototype.read = function (connection) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            setTimeout(function () {
                                var variablesToUpdate = new Array();
                                connection.plcConnection.readAllItems(function (error, values) {
                                    if (error)
                                        reject(error);
                                    else {
                                        var allVariables = __spreadArray(__spreadArray([], connection.plc.variablesToReadOnly, true), connection.plc.variablesToReadWrite, true);
                                        allVariables.map(function (m) {
                                            var _a, _b;
                                            if (values.hasOwnProperty(m.variableRef.name)) {
                                                if (variablesToUpdate.length < 100 &&
                                                    (((typeof ((_a = m === null || m === void 0 ? void 0 : m.variableRef) === null || _a === void 0 ? void 0 : _a.value) == 'undefined')
                                                        && (typeof values[m.variableRef.name] != 'undefined')) ||
                                                        (((_b = m === null || m === void 0 ? void 0 : m.variableRef) === null || _b === void 0 ? void 0 : _b.value) !=
                                                            values[m.variableRef.name]))) {
                                                    //so the local list of variables is always up to date
                                                    m.variableRef.value = values[m.variableRef.name];
                                                    variablesToUpdate.push(m);
                                                }
                                            }
                                        });
                                        resolve(variablesToUpdate);
                                    }
                                });
                            }, 500);
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    Syncer.prototype.updateDatabase = function (connection, variablesToUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var dataToInsert, returnedData, e_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    dataToInsert = new Array();
                                    variablesToUpdate.map(function (m) {
                                        dataToInsert.push({
                                            id: m.variableRef._id,
                                            "data": {
                                                value: m.variableRef.value
                                            }
                                        });
                                    });
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, apollo_client_1["default"].mutate({
                                            mutation: (0, client_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n              mutation myMutation($data: [VariablesUpdateInput]!) {\n                updateVariables(data: $data) {\n                  id\n                  value\n                }\n              }\n            "], ["\n              mutation myMutation($data: [VariablesUpdateInput]!) {\n                updateVariables(data: $data) {\n                  id\n                  value\n                }\n              }\n            "]))),
                                            variables: {
                                                data: dataToInsert
                                            }
                                        })];
                                case 2:
                                    returnedData = _a.sent();
                                    resolve(returnedData);
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_2 = _a.sent();
                                    console.log(e_2.networkError);
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    Syncer.prototype.operationProcessor = function (allInPending, newOperations) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var toDeclareSuccessfull, returnedData, e_3, newOpps, modOpps, delOpps, toCreate, returnedData, e_4;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    toDeclareSuccessfull = [];
                                    allInPending.forEach(function (pendingOperation) {
                                        var matched = false;
                                        for (var i = 0; i < newOperations.length; i++) {
                                            if (pendingOperation.operation == newOperations[i].operation
                                                && pendingOperation.payload == newOperations[i].payload) {
                                                matched = true;
                                                break;
                                            }
                                        }
                                        if (!matched) {
                                            toDeclareSuccessfull.push({ data: { status: "Success" }, id: pendingOperation._id });
                                        }
                                    });
                                    if (!(toDeclareSuccessfull.length > 0)) return [3 /*break*/, 4];
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, apollo_client_1["default"].mutate({
                                            mutation: (0, client_1.gql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n                mutation myMutation($data:  [OperacjePLCSUpdateInput]) {\n                  updateOperacjePLCS(data: $data) {\n                    id\n                    status\n                  }\n                }\n            "], ["\n                mutation myMutation($data:  [OperacjePLCSUpdateInput]) {\n                  updateOperacjePLCS(data: $data) {\n                    id\n                    status\n                  }\n                }\n            "]))),
                                            variables: {
                                                data: toDeclareSuccessfull
                                            }
                                        })];
                                case 2:
                                    returnedData = _a.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_3 = _a.sent();
                                    console.log(e_3.networkError);
                                    reject(e_3);
                                    return [3 /*break*/, 4];
                                case 4:
                                    //if number of pending jobs = 0;
                                    //pick the most important task from the list of new jobs
                                    //send it to db as pending
                                    console.log('will proceed with commands?');
                                    console.log((allInPending.length - toDeclareSuccessfull.length) <= 0);
                                    console.log('end commands');
                                    if (!((allInPending.length - toDeclareSuccessfull.length) <= 0)) return [3 /*break*/, 9];
                                    newOpps = [];
                                    modOpps = [];
                                    delOpps = [];
                                    newOperations.forEach(function (operation) {
                                        switch (operation === null || operation === void 0 ? void 0 : operation.operation) {
                                            case ('Paczki_CREATE'): {
                                                newOpps.push(operation);
                                                break;
                                            }
                                            case ('Paczki_UPDATE'): {
                                                modOpps.push(operation);
                                                break;
                                            }
                                            case ('Paczki_DELETE'): {
                                                delOpps.push(operation);
                                                break;
                                            }
                                        }
                                    });
                                    toCreate = __spreadArray(__spreadArray(__spreadArray([], newOpps, true), modOpps, true), delOpps, true)[0];
                                    if (!toCreate) return [3 /*break*/, 8];
                                    _a.label = 5;
                                case 5:
                                    _a.trys.push([5, 7, , 8]);
                                    return [4 /*yield*/, apollo_client_1["default"].mutate({
                                            mutation: (0, client_1.gql)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n                mutation myMutation($data:  OperacjePLCCreateInput) {\n                 createOperacjePLC(data: $data){\n    \t\t\t\t\t\tid\n  \t\t\t\t\t\t\t}\n                }\n              "], ["\n                mutation myMutation($data:  OperacjePLCCreateInput) {\n                 createOperacjePLC(data: $data){\n    \t\t\t\t\t\tid\n  \t\t\t\t\t\t\t}\n                }\n              "]))),
                                            variables: {
                                                data: toCreate
                                            }
                                        })];
                                case 6:
                                    returnedData = _a.sent();
                                    return [3 /*break*/, 8];
                                case 7:
                                    e_4 = _a.sent();
                                    console.log(e_4.networkError);
                                    reject(e_4);
                                    return [3 /*break*/, 8];
                                case 8:
                                    resolve();
                                    _a.label = 9;
                                case 9:
                                    resolve();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    return Syncer;
}());
exports["default"] = Syncer;
var Paczki_CREATE = /** @class */ (function () {
    function Paczki_CREATE() {
    }
    Paczki_CREATE.generateVariables = function (instructions) {
        var toReturn = {};
        Object.assign(toReturn, API_default);
        toReturn.v1 = 1; //status komunikacji
        toReturn.v2 = 1; //nr polecenia
        var payload = JSON.parse(instructions === null || instructions === void 0 ? void 0 : instructions.payload);
        //payload to paczka
        toReturn.v3 = payload === null || payload === void 0 ? void 0 : payload.name; //nazwa
        toReturn.v4 = parseInt(payload === null || payload === void 0 ? void 0 : payload.lPaczek); //ilość paczek
        toReturn.v5 = parseInt(payload === null || payload === void 0 ? void 0 : payload.nrPaczki); //numer paczki
        toReturn.v6 = parseInt(payload === null || payload === void 0 ? void 0 : payload.nrSeryjny1); //nr seryjny 1
        toReturn.v7 = parseInt(payload === null || payload === void 0 ? void 0 : payload.nrSeryjny2); //nr seryjny 2
        toReturn.v8 = parseInt(payload === null || payload === void 0 ? void 0 : payload.nrSeryjny3); //nr seryjny 3
        toReturn.v9 = parseInt(payload === null || payload === void 0 ? void 0 : payload.plcId); //id
        toReturn.v10 = parseInt(payload === null || payload === void 0 ? void 0 : payload.dlugosc); //długość podkładu
        return toReturn;
    };
    Paczki_CREATE.verifyResult = function () { };
    return Paczki_CREATE;
}());
var Paczki_UPDATE = /** @class */ (function () {
    function Paczki_UPDATE() {
    }
    Paczki_UPDATE.generateVariables = function (instructions) {
        var toReturn = {};
        Object.assign(toReturn, API_default);
        toReturn.v1 = 1; //status komunikacji
        toReturn.v2 = 2; //nr polecenia
        var payload = JSON.parse(instructions === null || instructions === void 0 ? void 0 : instructions.payload);
        //payload to paczka
        toReturn.v3 = payload === null || payload === void 0 ? void 0 : payload.name; //nazwa
        toReturn.v4 = parseInt(payload === null || payload === void 0 ? void 0 : payload.lPaczek); //ilość paczek
        toReturn.v5 = parseInt(payload === null || payload === void 0 ? void 0 : payload.nrPaczki); //numer paczki
        toReturn.v6 = parseInt(payload === null || payload === void 0 ? void 0 : payload.nrSeryjny1); //nr seryjny 1
        toReturn.v7 = parseInt(payload === null || payload === void 0 ? void 0 : payload.nrSeryjny2); //nr seryjny 2
        toReturn.v8 = parseInt(payload === null || payload === void 0 ? void 0 : payload.nrSeryjny3); //nr seryjny 3
        toReturn.v9 = parseInt(payload === null || payload === void 0 ? void 0 : payload.plcId); //id
        toReturn.v10 = parseInt(payload === null || payload === void 0 ? void 0 : payload.dlugosc); //długość podkładu
        return toReturn;
    };
    Paczki_UPDATE.verifyResult = function () { };
    return Paczki_UPDATE;
}());
var Paczki_DELETE = /** @class */ (function () {
    function Paczki_DELETE() {
    }
    Paczki_DELETE.generateVariables = function (instructions) {
        var toReturn = {};
        Object.assign(toReturn, API_default);
        toReturn.v1 = 1; //status komunikacji
        toReturn.v2 = 3; //nr polecenia
        var payload = JSON.parse(instructions === null || instructions === void 0 ? void 0 : instructions.payload);
        //payload to paczka
        toReturn.v9 = parseInt(payload === null || payload === void 0 ? void 0 : payload.plcId); //id
        return toReturn;
    };
    Paczki_DELETE.verifyResult = function () { };
    return Paczki_DELETE;
}());
var templateObject_1, templateObject_2, templateObject_3;
