import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import StudentType from '../student/schema';
import ButtonType from '../button/schema';
import TeacherType from '../teacher/schema';

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
    started: {
      type: GraphQLBoolean,
    },
    Students: {
      type: GraphQLList(StudentType),
    },
    Buttons: {
      type: GraphQLList(ButtonType),
    },
    Teacher: {
      type: TeacherType,
    },
  },
});

export default ClassType;
