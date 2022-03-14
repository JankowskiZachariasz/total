"use strict";
exports.__esModule = true;
require('dotenv').config();
var cross_fetch_1 = require("cross-fetch");
var client_1 = require("@apollo/client");
// Create GraphQL Client for FaunaDB, replace HttpLink configuration
// with your own GraphQL endpoint configuration.
var client = new client_1.ApolloClient({
    cache: new client_1.InMemoryCache(),
    link: new client_1.HttpLink({
        uri: (process.env.graphQlServerAddress + "/admin/api"),
        fetch: cross_fetch_1["default"],
        headers: {
        //"Authorization": `Bearer ${process.env.FAUNADB_SECRET}`,
        },
        fetchOptions: {
            mode: 'no-cors'
        }
    }),
    defaultOptions: {
        query: {
            fetchPolicy: 'no-cache'
        }
    }
});
exports["default"] = client;
