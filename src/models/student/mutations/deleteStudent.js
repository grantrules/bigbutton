import {
  GraphQLBoolean,
  GraphQLString,
} from 'graphql';

import StudentModel from '../student';
import ClassModel from '../../class/class';

export default {
  type: GraphQLBoolean,
  args: {
    studentId: { type: GraphQLString },
    classId: { type: GraphQLString },
  },
  resolve:
    (v, args, ctx) => ClassModel.findOne({
      where: { id: args.classId, fk_teacher_id: ctx.session.teacherId },
      include: [StudentModel],
    })
      .then((cl) => cl.Students
        .find((student) => student.id === args.studentId)
        .destroy()).then(() => true).catch((e) => { console.log(e); return false; }),
};
