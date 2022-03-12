"use strict";
exports.__esModule = true;
var fields_1 = require("@keystonejs/fields");
var plcCommandSchema = {
    fields: {
        name: { type: fields_1.Text, isRequired: false },
        datablock: { label: "Datablock", type: fields_1.Relationship, isRequired: true, ref: "datablock" },
        operation: { type: fields_1.Select, isRequired: true,
            options: [
                { value: 'Paczki_CREATE', label: 'Paczki_CREATE' },
                { value: 'Paczki_UPDATE', label: 'Paczki_UPDATE' },
                { value: 'Paczki_DELETE', label: 'Paczki_DELETE' },
            ]
        },
        timeSubmitted: { type: fields_1.DateTimeUtc, isRequired: true },
        status: { type: fields_1.Select, isRequired: true,
            options: [
                { value: 'Pending', label: 'Pending' },
                { value: 'Success', label: 'Success' }
            ]
            // hooks: {
            //     async validateInput(props : any){
            //         console.log('plCommand triggers'+props?.existingItem?.operation);
            //         if(props.operation=="update"){
            //             var result = await plcCommandTrigger.validateStatus(props);
            //             if(!result) {
            //                 props.addFieldValidationError('Command did not take effect yet.')
            //             };
            //         }
            //         return props.resolvedData;
            //     },
            // }
        },
        payload: { type: fields_1.Text, isRequired: true }
    },
    labelField: "name",
    adminConfig: {
        defaultColumns: 'name, timeSubmitted, status'
    }
};
exports["default"] = plcCommandSchema;
