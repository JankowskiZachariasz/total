require('dotenv').config()
import fetch from 'cross-fetch';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'


// Create GraphQL Client for FaunaDB, replace HttpLink configuration
// with your own GraphQL endpoint configuration.
const client = new ApolloClient({
  cache: new InMemoryCache(),
  
  link: new HttpLink({
    uri: (process.env.graphQlServerAddress+"/admin/api"),
    fetch,
    headers: {
      //"Authorization": `Bearer ${process.env.FAUNADB_SECRET}`,
    },
    fetchOptions: {
      mode: 'no-cors'
  }
  }),
  defaultOptions: {
    
    query: {
      fetchPolicy: 'no-cache',
    },
  }
})
export default client;