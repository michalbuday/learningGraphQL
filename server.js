const express = require('express');
const expressGraphQL = require('express-graphql');
const cors = require('cors');
const schema = require('./src/schema.js');

const app = express();

app.use('/graphql', cors(), expressGraphQL({
  schema: schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log("Server is running on port 4000")
});
