const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLInt,
} = require('graphql');

const ArticleType = require('./types');

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
        let views = args.views + 1; //for some reason args.views++ or views++ is not working
        const addViewToArticle = async (id, views) => {
          try {
            const response = await axios.patch('http://localhost:8080/articles/' + id, {
              views: views
            });
            return response.data;
          } catch (error) {
            console.log(error);
          }
        }
        return addViewToArticle(args.id, views);
      }
    }
  }
});

module.exports = mutation;