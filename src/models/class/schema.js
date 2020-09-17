import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const ClassType = new GraphQLObjectType({
  name: 'Class',
  fields: {
    id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    code: {
      type: GraphQLString,
    },
  },
});

export default ClassType;
