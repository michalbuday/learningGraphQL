const mutation = require('./graphql/mutations.js');
const RootQuery = require('./graphql/queries.js');
const axios = require('axios');

const {
  GraphQLSchema,
} = require('graphql');

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});