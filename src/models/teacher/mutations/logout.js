import {
  GraphQLBoolean,
} from 'graphql';

export default {
  type: GraphQLBoolean,
  resolve: (_v, _args, ctx) => { ctx.session.destroy(); return true; },
};
