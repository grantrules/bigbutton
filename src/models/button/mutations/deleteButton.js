import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

import ButtonModel from '../button';
import ClassModel from '../../class/class';

export default {
  type: GraphQLBoolean,
  args: {
    buttonId: { type: GraphQLInt },
    classId: { type: GraphQLString },
  },
  resolve:
    (v, args, ctx) => ClassModel.findOne({
      where: { id: args.classId, TeacherId: ctx.session.teacherId },
      include: [ButtonModel],
    })
      .then((cl) => cl.Buttons
        .find((button) => button.id === args.buttonId)
        .destroy()).then(() => true).catch((e) => { console.log(e); return false; }),
};
