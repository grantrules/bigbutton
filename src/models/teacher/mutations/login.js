import {
  GraphQLBoolean,
  GraphQLString,
} from 'graphql';

import TeacherModel from '../teacher';
import { compare } from '../../../utils/hash';

export default {
  type: GraphQLBoolean,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve:
    async (v, { email, password }, ctx) => TeacherModel.findOne({ where: { email } })
      .then((teacher) => compare(password, teacher.passwordHash).then((equal) => {
        if (equal) {
          ctx.session.email = teacher.email;
          ctx.session.teacherId = teacher.id;
        }
        return equal;
      }))
      .catch(() => false),
};
