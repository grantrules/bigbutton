import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const StudentType = new GraphQLObjectType({
  name: 'Student',
  fields: {
    id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
  },
});

export default StudentType;
