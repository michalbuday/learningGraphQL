const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
} = require('graphql');

const articles = [
  { id: 1, title: 't', text: 'text1', author: 'auth1' },
  { id: 2, title: 'tt', text: 'text2', author: 'auth2' },
  { id: 3, title: 'ttt', text: 'text3', author: 'auth3' },
  { id: 4, title: 'tttt', text: 'text4', author: 'auth4' }
];

const ArticleType = new GraphQLObjectType({
  name: 'Article',
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    author: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    article: {
      type: ArticleType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        return articles.find((c) => c.id == args.id);
      }
    },
    articles: {
      type: new GraphQLList(ArticleType),
      resolve(parentValue, args) {
        return articles;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});