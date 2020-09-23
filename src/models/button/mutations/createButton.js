import {
  GraphQLString,
} from 'graphql';

import ButtonModel from '../button';
import ButtonType from '../schema';

export default {
  type: ButtonType,
  args: {
    classId: { type: GraphQLString },
    color: { type: GraphQLString },
  },
  resolve:
    async (v, args) => ButtonModel.create({ color: args.color, ClassId: args.classId }),
};
