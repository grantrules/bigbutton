import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import StudentType from '../student/schema';
import ButtonType from '../button/schema';

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
      type: GraphQLList(ButtonType),
    },
  },
});

export default ClassType;
