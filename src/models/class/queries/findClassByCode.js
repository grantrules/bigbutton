import {
  GraphQLString,
} from 'graphql';

import ClassModel from '../class';
import ClassType from '../schema';
import Button from '../../button/button';
import Teacher from '../../teacher/teacher';

export default {
  type: ClassType,
  args: {
    code: { type: GraphQLString },
  },
  resolve:
    async (v, { code }) => ClassModel.findOne({
      where: { code },
      include: [Button, Teacher],
    }),
};
