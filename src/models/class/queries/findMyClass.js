import {
  GraphQLString,
} from 'graphql';

import ClassModel from '../class';
import ClassType from '../schema';
import Student from '../../student/student';
import Button from '../../button/button';

export default {
  type: ClassType,
  args: {
    classId: { type: GraphQLString },
  },
  resolve:
    async (v, { classId }, ctx) => ClassModel.findOne({
      where: { id: classId, fk_teacher_id: ctx.session.teacherId },
      include: [Button, Student],
    }),
};
