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
    color: { type: GraphQLString },
  },
  resolve:
    (v, args, ctx) => ClassModel.findOne({
      where: { id: args.classId, fk_teacher_id: ctx.session.teacherId },
      include: [ButtonModel],
    })
      .then((cl) => {
        const button = cl.Buttons
          .find((b) => b.id === args.buttonId);

        button.color = args.color;
        return button.save();
      }).then(() => true).catch((e) => { console.log(e); return false; }),
};
