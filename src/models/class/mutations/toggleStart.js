import {
  GraphQLInt,
} from 'graphql';

import pubsub from '../../../middleware/graphql/pubsub';

import ClassModel from '../class';
import ClassType from '../schema';

export default {
  type: ClassType,
  args: {
    classId: { type: GraphQLInt },
  },
  resolve:
    async (v, args, ctx) => {
      const { started } = await ClassModel.findByPk(args.classId);
      await ClassModel.update({ started: !started },
        { where: { id: args.classId, fk_teacher_id: ctx.session.teacherId } });
      pubsub.publish('CLASS_STARTED', { studentUpdates: { classId: args.classId, started: !started } });
    },
};
