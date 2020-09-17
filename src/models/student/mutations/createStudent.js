import {
  GraphQLString,
} from 'graphql';

import StudentModel from '../student';
import StudentType from '../schema';

export default {
  type: StudentType,
  args: {
    classId: { type: GraphQLString },
    name: { type: GraphQLString },
  },
  resolve:
    async (v, args) => StudentModel.create({ name: args.name, ClassId: args.classId }),
};
