import {
  GraphQLBoolean,
  GraphQLString,
} from 'graphql';

import TeacherModel from '../teacher';
import { hash } from '../../../utils/hash';

export default {
  type: GraphQLBoolean,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    school: { type: GraphQLString },
    name: { type: GraphQLString },
  },
  resolve: async (
    v,
    {
      name, email, school, password,
    },
  ) => hash(password).then((pass) => !!TeacherModel.create({
    name, email, school, password: pass,
  })),
};
