import {
  GraphQLList,
} from 'graphql';

import ClassModel from '../class';
import ClassType from '../schema';

export default {
  type: GraphQLList(ClassType),
  args: {
  },
  resolve:
    async (v, args, ctx) => ClassModel.findAll({ where: { fk_teacher_id: ctx.session.teacherId } }),
};
