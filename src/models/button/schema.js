import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const ButtonType = new GraphQLObjectType({
  name: 'Button',
  fields: {
    id: {
      type: GraphQLString,
    },
    color: {
      type: GraphQLString,
    },
  },
});

export default ButtonType;
