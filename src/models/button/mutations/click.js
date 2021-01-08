import {
  GraphQLBoolean,
  GraphQLString,
} from 'graphql';
import pubsub from '../../../middleware/graphql/pubsub';

export default {
  type: GraphQLBoolean,
  args: {
    buttonId: { type: GraphQLString },
    buttonState: { type: GraphQLBoolean },
  },
  resolve:
    async (v, args) => {
      try {
        await pubsub.publish('clicked', args);
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
};
