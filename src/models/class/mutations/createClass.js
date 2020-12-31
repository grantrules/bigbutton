import {
  GraphQLString,
} from 'graphql';

import generateId from '../../../utils/generateId';

import ClassModel from '../class';
import ClassType from '../schema';

export default {
  type: ClassType,
  args: {
    name: { type: GraphQLString },
  },
  resolve:
    async (v, args, ctx) => ClassModel.create({
      fk_teacher_id: ctx.session.teacherId, name: args.name, code: generateId(),
    }),
};
