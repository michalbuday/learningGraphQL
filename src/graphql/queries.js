const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
} = require('graphql');

const ArticleType = require('./types');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    article: {
      type: ArticleType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        const getArticleById = async (id) => {
          try {
            const response = await axios.get('http://localhost:8080/articles/' + id);
            return response.data;
          } catch (error) {
            console.log(error);
          }
        }
        return getArticleById(args.id);
      }
    },
    articles: {
      type: new GraphQLList(ArticleType),
      resolve(parentValue, args) {
        const getArticles = async () => {
          try {
            const response = await axios.get('http://localhost:8080/articles');
            return response.data;
          } catch (error) {
            console.log(error);
          }
        }
        return getArticles();
      }
    }
  }
});

module.exports = RootQuery;