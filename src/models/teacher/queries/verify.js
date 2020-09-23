import {
  GraphQLBoolean,
} from 'graphql';
import { auth } from '../../../utils/auth';

export default {
  type: GraphQLBoolean,
  resolve: (_v, _args, ctx) => !!auth(() => true)(ctx),
};
