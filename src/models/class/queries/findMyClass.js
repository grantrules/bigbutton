import {
  GraphQLString,
} from 'graphql';

import ClassModel from '../class';
import ClassType from '../schema';

export default {
  type: ClassType,
  args: {
    classId: { type: GraphQLString },
  },
  resolve:
    async (v, { classId }, ctx) => ClassModel.findOne({
      where: { id: classId, TeacherId: ctx.session.teacherId },
    }).then((res) => { console.log(res); return res; }),
};
