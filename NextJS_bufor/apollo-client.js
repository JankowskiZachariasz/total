import { ApolloClient, InMemoryCache, gql, HttpLink  } from "@apollo/client";

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

const client = new ApolloClient({
    uri: "http://"+process.env.NEXT_PUBLIC_KEYSTONE_SERVER_ADDRESS+"/admin/api",
    cache: new InMemoryCache(),
    fetchOptions: {
        mode: 'no-cors',
      },
      defaultOptions: defaultOptions,
});

export const authClient = (token) => new ApolloClient({
  uri: "http://"+process.env.NEXT_PUBLIC_KEYSTONE_SERVER_ADDRESS+"/admin/api",
  cache: new InMemoryCache(),
  headers:{
    Authorization: `Bearer ${token}`
  },
  fetchOptions: {
      mode: 'no-cors',
    },
    defaultOptions: defaultOptions,
});

export default client;

export const getProducts = gql`
query getProducts($offset:Int!,$limit:Int!,$search:String!){
  allProducts(skip:$offset,first:$limit,search:$search,where:{toDelete_not:true},sortBy:id_DESC){
    id
    namePlc
    series1
    series2
    series3
    count
    length1
    length2
    length3
    plcId1
    plcId2
    plcId3
  },
  _allProductsMeta(search:$search,where:{toDelete_not:true}){count}
} 
`;

export const createProduct = gql`
mutation usersList($product:ProductCreateInput!){
createProduct(data: $product){
  name
}} 
`;

export const updateProduct = gql`
mutation usersList($product:ProductUpdateInput!, $id: ID!){
  updateProduct(id: $id, data: $product){
    name
  }} 
  `;

export const getConveyors = gql`
query getConveyors($name1:String!, $name2:String!, $name3:String!, ){
  allConveyors{
    plcId,
    packageId,
    position0,
    position1,
    position2,
    position3,
    colorRegular,
    colorClicked
  },
  allVariables(where:{name_in:[$name1,$name2,$name3]}){
    name,
    value
  }
} 

`;

export const getBufforedProducts = gql`
query getBufforedProducts($name1:Int!){
  allBufforedProducts(where:{OR:[{series1: $name1}, {series2: $name1}, {series3: $name1}]} ){
    name,
    status
  }
} 
`;