import {
  GraphQLString,
} from 'graphql';

import TeacherModel from '../teacher';
import TeacherType from '../schema';

export default {
  type: TeacherType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve:
    async (v, args, ctx) => TeacherModel.findOne({ where: { email: ctx.session.email } }),
};
