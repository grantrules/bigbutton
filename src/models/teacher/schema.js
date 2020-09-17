import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const TeacherType = new GraphQLObjectType({
  name: 'Teacher',
  fields: {
    email: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    school: {
      type: GraphQLString,
    },
  },
});

export default TeacherType;
