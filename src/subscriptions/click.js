import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

export default {
  type: GraphQLBoolean,
  resolve: () => true,
  subscribe: () => true,
};
