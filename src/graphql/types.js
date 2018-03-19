const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = require('graphql');

const ArticleType = new GraphQLObjectType({
  name: 'Article',
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    author: { type: GraphQLString },
    views: { type: GraphQLInt }
  })
});

module.exports = ArticleType;