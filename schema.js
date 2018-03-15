const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
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

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    article: {
      type: ArticleType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        return axios.get('http://localhost:8080/articles/' + args.id)
          .then(res => res.data);
      }
    },
    articles: {
      type: new GraphQLList(ArticleType),
      resolve(parentValue, args) {
        return axios.get('http://localhost:8080/articles')
          .then(res => res.data);
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addViewToArticle: {
      type: ArticleType,
      args: {
        id: { type: GraphQLInt },
        views: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        views = args.views + 1; //for some reason args.views++ or views++ is not working
        return axios.patch('http://localhost:8080/articles/' + args.id, {
          views: views
        }).then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});