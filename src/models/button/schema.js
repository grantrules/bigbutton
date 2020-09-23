import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const ButtonType = new GraphQLObjectType({
  name: 'Button',
  fields: {
    id: {
      type: GraphQLInt,
    },
    color: {
      type: GraphQLString,
    },
  },
});

export default ButtonType;
