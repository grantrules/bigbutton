import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import StudentType from '../student/schema';

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
    Students: {
      type: GraphQLList(StudentType),
    },
    Buttons: {
      type: GraphQLList(StudentType),
    },
  },
});

export default ClassType;
