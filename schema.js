const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
} = require('graphql');


let articles = [
  { id: 1, title: 'Article One', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mollis nunc sed id semper risus in hendrerit gravida rutrum. Velit ut tortor pretium viverra suspendisse potenti nullam ac. Leo a diam sollicitudin tempor id eu nisl nunc mi. Rhoncus dolor purus non enim praesent elementum facilisis leo. Sed risus ultricies tristique nulla aliquet enim tortor at. Tellus cras adipiscing enim eu turpis egestas pretium. Dolor magna eget est lorem. Placerat vestibulum lectus mauris ultrices eros. Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum. Quam viverra orci sagittis eu volutpat odio facilisis.', author: 'Jhon Doe', views: 0 },
  { id: 2, title: 'Article Two', text: 'Dictum non consectetur a erat nam at lectus urna duis. Laoreet sit amet cursus sit amet dictum sit amet. Placerat vestibulum lectus mauris ultrices eros. Elementum integer enim neque volutpat ac tincidunt. In nisl nisi scelerisque eu ultrices. Ut tortor pretium viverra suspendisse potenti nullam. Eget mi proin sed libero enim sed faucibus. Id donec ultrices tincidunt arcu non sodales. Curabitur vitae nunc sed velit dignissim sodales ut eu. Tellus rutrum tellus pellentesque eu. Id faucibus nisl tincidunt eget nullam non. Convallis convallis tellus id interdum velit laoreet id donec. Leo in vitae turpis massa sed elementum tempus egestas sed. A pellentesque sit amet porttitor eget. Laoreet non curabitur gravida arcu. Sed faucibus turpis in eu mi bibendum neque. Nam aliquam sem et tortor consequat id.', author: 'James Bond', views: 0 },
  { id: 3, title: 'Article Three', text: 'Purus sit amet volutpat consequat mauris. Sed odio morbi quis commodo odio aenean. Fermentum dui faucibus in ornare quam viverra. Tortor pretium viverra suspendisse potenti nullam ac tortor vitae. Morbi quis commodo odio aenean sed. Bibendum est ultricies integer quis. In pellentesque massa placerat duis ultricies lacus. Magna etiam tempor orci eu lobortis elementum. Lectus quam id leo in vitae turpis massa. Faucibus pulvinar elementum integer enim neque volutpat. At lectus urna duis convallis convallis tellus. Iaculis eu non diam phasellus. Dui vivamus arcu felis bibendum ut tristique et. Nunc eget lorem dolor sed viverra ipsum. In hac habitasse platea dictumst. Arcu felis bibendum ut tristique et.', author: 'Jonny Depp', views: 0 },
  { id: 4, title: 'Article Four', text: 'Amet nulla facilisi morbi tempus iaculis urna id. Elementum tempus egestas sed sed risus. Velit egestas dui id ornare arcu. Morbi tincidunt ornare massa eget egestas purus viverra. Tortor vitae purus faucibus ornare suspendisse sed nisi lacus. Ut faucibus pulvinar elementum integer. Vitae purus faucibus ornare suspendisse sed nisi lacus sed viverra. Feugiat nisl pretium fusce id velit ut tortor pretium viverra. Gravida dictum fusce ut placerat. Dolor magna eget est lorem ipsum. Donec ultrices tincidunt arcu non sodales neque.', author: 'Bob', views: 0 }
];

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

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addViewToArticle: {
      type: ArticleType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        data = articles.find((c) => c.id == args.id);
        data.views++;
        return data;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});