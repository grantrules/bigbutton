import {
  GraphQLBoolean,
  GraphQLString,
} from 'graphql';

import pubsub from '../../../middleware/graphql/pubsub';

import ClassModel from '../class';

export default {
  type: GraphQLBoolean,
  args: {
    classId: { type: GraphQLString },
  },
  resolve:
    async (v, args, ctx) => {
      const { started } = await ClassModel.findByPk(args.classId);
      console.log(started);
      await ClassModel.update({ started: !started },
        { where: { id: args.classId, fk_teacher_id: ctx.session.teacherId } });
      pubsub.publish('CLASS_STARTED', { studentUpdates: { classId: args.classId, started: !started } });
      return !started;
    },
};
