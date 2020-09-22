import {
  GraphQLList,
} from 'graphql';

import ClassModel from '../../class/class';
import ClassType from '../../class/schema';

export default {
  type: GraphQLList(ClassType),
  args: {
  },
  resolve:
    async (v, args, ctx) => ClassModel.findAll({ where: { TeacherId: ctx.session.teacherId } }),
};
